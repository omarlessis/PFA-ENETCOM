const mongoose = require('mongoose');
const formationModel=require('./formationModel');
const quizSchema = new mongoose.Schema({
  quiz_name: { type: String,
  required: true },
  questions: { type: mongoose.Schema.Types.Mixed,
  required: true },
  formation_id: { type: mongoose.Schema.Types.ObjectId,
  ref: formationModel,
  required: true }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
