var mongoose = require('mongoose');
const studentModel = require('./studentModel');
const reponseModel = require('./reponseModel');
const formation = require('./formationModel');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    title:{
        type: String,
        required:true,
        
    },
    description:{
        type: String,
        required:true,
        
    },
    auteur:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:studentModel,
    },
   
   
    answers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: reponseModel,
        },
      ],
    // answers: {
    //     type: [{
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: reponseModel,
    //     }],
    //     default: []
    // },

    permission:{
        type:String,
    }
    
   
});
module.exports = mongoose.model('question',QuestionSchema);