const Quiz = require('../model/quizzModel');

// Create a new quiz
exports.createQuizz= async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    const savedQuiz = await quiz.save();
    res.json(savedQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getQuizz= async (req, res) => {    //bil id ytala3lik chkoun
    try {
      console.log('Getting question...');
      const quizzid =req.params.idQuizz
      const quizz =  await Quiz.find({ formation_id: quizzid });
      console.log('Quizz:', quizz);
      res.json(quizz);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
