const mongoose = require('mongoose');
const formationModel = require('./formationModel');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  name: String,
  type: String,
  size: Number,
  path: String,
  formation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: formationModel,
    required: true,
  },
});

module.exports = mongoose.model('File', FileSchema);


