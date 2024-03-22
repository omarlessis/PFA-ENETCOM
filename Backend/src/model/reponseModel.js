var mongoose = require('mongoose');
const studentModel = require('./studentModel');
const questionModel = require('./questionModel');
const formationModel=require('./formationModel');
var Schema = mongoose.Schema;

var ReponseSchema = new Schema({
    description:{
        type: String,
        required:true,
        
    },
    auteur:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        Ref:studentModel
        
    },
    question:{
        type: mongoose.Schema.Types.ObjectId,
        Ref:questionModel,
    },
  
    date: {
        type: Date,
        default: Date.now
    },
    permission:{
        type:String,
    }
    
   
});
module.exports = mongoose.model('reponse',ReponseSchema );