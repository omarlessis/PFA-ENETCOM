var userModel=require('../model/reponseModel');
var questionModel=require('../model/questionModel');




module.exports.createReponseDBService = (reponseDetails) => {
  return new Promise(async (resolve, reject) => {
      try {
          var reponseModelData = new userModel();
          reponseModelData.description = reponseDetails.description;
          reponseModelData.auteur = reponseDetails.auteur;
          reponseModelData.question = reponseDetails.question;
          reponseModelData.date = reponseDetails.date;
          const result = await reponseModelData.save();
          if (result) {
              // Update the question with the ID of the new answer
              await questionModel.findByIdAndUpdate(
                  reponseDetails.question,
                  { $push: { answers: result._id } }
              );
              resolve(true);
          } else {
              reject(new Error("Failed to save reponse data."));
          }
      } catch (error) {
          console.error("Error while saving reponse data: ", error);
          reject(new Error("Failed to save reponse data."));
      }
  });
};

  module.exports.updateReponseDBService = (id, updateDetails) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await userModel.findByIdAndUpdate(id, updateDetails, { new: true });
  
        if (result) {
          resolve(result);
        } else {
          reject(new Error("Impossible de mettre à jour la réponse."));
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du réponse : ", error);
        reject(new Error("Impossible de mettre à jour la réponse."));
      }
    });
  };