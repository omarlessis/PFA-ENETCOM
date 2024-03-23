var mongoose = require('mongoose');
const studentModel = require('./studentModel');
const formationModel = require('./formationModel');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
  formation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: formationModel,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: studentModel,
    required: true,
  },
  vote: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

module.exports = mongoose.model('Vote', VoteSchema);
