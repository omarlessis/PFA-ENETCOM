
const questionModel = require('../model/questionModel');
const questionService = require('../service/questionService');



const createQuestionControllerFn = async (req, res)=>
{
    try
    {
        console.log(req.body);
        const status = await questionService.createQuestionDBService(req.body);
        console.log(status);

        if(status){
            res.send({"status":true,"message":"question created successfully"});
        } else{
            res.send({"status":false,"message":"error creating question"});
        }
    }
    catch(err)
    {
        console.log(err);
    }
    
}
const updateQuestionControllerFn = async (req, res) => {
    try {
      const id = req.params.idquestion;
      const updateDetails = req.body;
  
      const result = await questionService.updateQuestionDBService(id, updateDetails);
  
      if (result) {
        res.send({ "status": true, "message": "Question mis à jour avec succès", "data": result });
      } else {
        res.send({ "status": false, "message": "erreur lors de la mise à jour du question" });
      }
    } catch (err) {
      console.log(err);
    }
  }
  const deleteQuestionController = async (req, res, next) => {
    const questionId = req.params.id;
  
    try {
      const question = await questionModel.findById(questionId);
      if (!question) {
        return res.status(404).json({ error: "Question non trouvée." });
      }
  
      const result = await questionModel.findByIdAndDelete(questionId);
      res.status(200).json(result);
    } catch (error) {
      console.error("Erreur lors de la suppression du question: ", error);
      res.status(500).json({ error: "Impossible de supprimer le question." });
    }
  };
  var getAllQuestion=async (req,res)=>{
    try {
        
        console.log('Getting questions...');
        const questions = await questionModel.find().populate('answers').populate('auteur'); 
        
        console.log('Questions:', questions);
        res.json(questions);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}
var getQuestion= async (req, res) => {    //bil id ytala3lik chkoun
  try {
    console.log('Getting question...');
    const questionid =req.params.idQuestion
    const question = await questionModel.findById(questionid); 
    
    console.log('Question:', question);
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
module.exports ={createQuestionControllerFn,updateQuestionControllerFn,deleteQuestionController,getAllQuestion,getQuestion};