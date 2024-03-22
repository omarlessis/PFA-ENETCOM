var userModel=require('../model/formationModel');




module.exports.createFormationDBService = (formationDetails) => {
    return new Promise(async (resolve, reject) => {
      try {
        var formationModelData = new userModel();
        formationModelData.nameFormateur = formationDetails.nameFormateur;
        formationModelData.picture = formationDetails.picture;
        formationModelData.nameFormation = formationDetails.nameFormation;
        formationModelData.dateAjout = formationDetails.dateAjout;
        formationModelData.dateFin = formationDetails.dateFin;
        formationModelData.description = formationDetails.description;
        formationModelData.questions = formationDetails.questions;
       
      
  
        const result = await formationModelData.save();
        if (result) {
          resolve(true);
        } else {
          reject(new Error("Failed to save formation data."));
        }
      } catch (error) {
        console.error("Error while saving formation data: ", error);
        reject(new Error("Failed to save formation data."));
      }
    });
  };


module.exports.updateFormationDBService = (id, updateDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await userModel.findByIdAndUpdate(id, updateDetails, { new: true });

      if (result) {
        resolve(result);
      } else {
        reject(new Error("Impossible de mettre à jour la formation."));
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la formation : ", error);
      reject(new Error("Impossible de mettre à jour la formation."));
    }
  });
};
