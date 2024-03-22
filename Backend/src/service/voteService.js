var voteModel=require('../model/voteModel');

const Vote = require('../model/voteModel');
const Formation = require('../model/formationModel');
const Student = require('../model/studentModel');


module.exports.voteDBService = (voteDetails) => {
    return new Promise(async (resolve, reject) => {
      try {
        var voteModelData = new voteModel();
  
        voteModelData.formation = voteDetails.formation;
        voteModelData.user = voteDetails.user;
        voteModelData.vote = voteDetails.vote;
        
      
  
        const result = await voteModelData.save();
        if (result) {
          resolve(true);
        } else {
          reject(new Error("Failed to save vote data."));
        }
      } catch (error) {
        console.error("Error while saving vote data: ", error);
        reject(new Error("Failed to save vote data."));
      }
    });
    
  };