var inscriptionModel=require('../model/userFormation');
const nodemailer = require("nodemailer");
const studentModel = require('../model/studentModel');
var formationModel=require('../model/formationModel');

const checkIfAlreadyEnrolled = async (user, formations) => {
  try {
    const existingInscription = await inscriptionModel.findOne({
      user: user,
      formation: { $in: formations },
    });
    return existingInscription ? true : false;
  } catch (error) {
    console.error("Error while checking existing inscription: ", error);
    return true;
  }
};






const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "saifsallemi85@gmail.com",
    pass: "mjxttztyaeopoyyx",
  },
});

const sendEmail = async (userEmail, formationName , startDate , endDate) => {
  try {
    const info = await transporter.sendMail({
      from: '"saif" <saifsallemi85@gmail.com>',
      to: userEmail,
      subject: "Inscription Confirmation",
      text: `You have successfully registered for the ${formationName} formation. The course will start on ${startDate} and end on ${endDate}.`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error while sending email: ", error);
  }
};

module.exports.createInscriptionDBService = async (inscriptionDetails) => {
  try {
    const alreadyEnrolled = await checkIfAlreadyEnrolled(
      inscriptionDetails.user,
      inscriptionDetails.formation
    );
    if (alreadyEnrolled) {
      throw new Error("User already registered for one of the selected formations.");
    }
    const inscriptionModelData = new inscriptionModel();
    inscriptionModelData.user = inscriptionDetails.user;
    inscriptionModelData.formation = inscriptionDetails.formation || [];

    const result = await inscriptionModelData.save();
    
    // Envoie d'un e-mail de confirmation
    const user = await studentModel.findById(inscriptionDetails.user);
    const formation = await formationModel.findById(inscriptionDetails.formation[0]);
    const startDate = new Date(formation.dateAjout).toLocaleDateString();
    const endDate = new Date(formation.dateFin).toLocaleDateString();
    sendEmail(user.email, formation.nameFormation,startDate,endDate );

    return result ? true : false;
  } catch (error) {
    console.error("Error while saving inscription data: ", error);
    if (error.message === "User already registered for one of the selected formations.") {
      throw { status: 400, message: error.message };
    } else {
      throw new Error("Failed to save inscription data.");
    }
  }
};
