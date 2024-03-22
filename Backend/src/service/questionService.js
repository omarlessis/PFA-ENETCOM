var userModel=require('../model/questionModel');




module.exports.createQuestionDBService = (questionDetails) => {
    return new Promise(async (resolve, reject) => {
      try {
        var questionModelData = new userModel();
  
        questionModelData.title = questionDetails.title;
        questionModelData.description = questionDetails.description;
        questionModelData.auteur = questionDetails.auteur;
        questionModelData.answers = questionDetails.answers || [];
        questionModelData.Formation = questionDetails.Formation;
       
      
  
        const result = await questionModelData.save();
        if (result) {
          resolve(true);
        } else {
          reject(new Error("Failed to save question data."));
        }
      } catch (error) {
        console.error("Error while saving question data: ", error);
        reject(new Error("Failed to save question data."));
      }
    });
  };
  module.exports.updateQuestionDBService = (id, updateDetails) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await userModel.findByIdAndUpdate(id, updateDetails, { new: true });
  
        if (result) {
          resolve(result);
        } else {
          reject(new Error("Impossible de mettre à jour le question."));
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du question : ", error);
        reject(new Error("Impossible de mettre à jour la formation."));
      }
    });
  };