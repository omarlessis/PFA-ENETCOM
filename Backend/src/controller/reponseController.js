
const reponseModel = require('../model/reponseModel');
const reponseService = require('../service/reponseService');



const createReponseControllerFn = async (req, res)=>
{
    try
    {
        console.log(req.body);
        const status = await reponseService.createReponseDBService(req.body);
        console.log(status);

        if(status){
            res.send({"status":true,"message":"reponse created successfully"});
        } else{
            res.send({"status":false,"message":"error creating reponse"});
        }
    }
    catch(err)
    {
        console.log(err);
    }
    
}
const updateReponseControllerFn = async (req, res) => {
    try {
      const id = req.params.idreponse;
      const updateDetails = req.body;
  
      const result = await reponseService.updateReponseDBService(id, updateDetails);
  
      if (result) {
        res.send({ "status": true, "message": "réponse mis à jour avec succès", "data": result });
      } else {
        res.send({ "status": false, "message": "erreur lors de la mise à jour du réponse" });
      }
    } catch (err) {
      console.log(err);
    }
  }
  const deleteReponseController = async (req, res, next) => {
    const reponseId = req.params.id;
  
    try {
      const reponse = await reponseModel.findById(reponseId);
      if (!reponse) {
        return res.status(404).json({ error: "Question non trouvée." });
      }
  
      const result = await reponseModel.findByIdAndDelete(reponseId);
      res.status(200).json(result);
    } catch (error) {
      console.error("Erreur lors de la suppression du réponse: ", error);
      res.status(500).json({ error: "Impossible de supprimer la réponse." });
    }
  };
  var getAllReponse=async (req,res)=>{
    try {
        
        console.log('Getting reponse...');
        const reponses = await reponseModel.find().populate('auteur'); 
        
        console.log('Reponses:', reponses);
        res.json(reponses);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}
var getReponse= async (req, res) => {    //bil id ytala3lik chkoun
  try {
    console.log('Getting reponse...');
    const reponseId =req.params.idReponse
    const reponse = await reponseModel.findById(reponseId); 
    
    console.log('Reponse:', reponse);
    res.json(reponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
module.exports ={createReponseControllerFn,updateReponseControllerFn,deleteReponseController,getAllReponse,getReponse};