var mongoose = require('mongoose');
const questionModel = require('./questionModel');
var Schema = mongoose.Schema;
var formationSchema = new Schema({
    nameFormation:{
        type: String,
        required:true,
        
    },
    picture:{
        type: String,
        required:false,
        
    },

    nameFormateur:{
        type: String,
        required:true,
        
    },
    dateAjout:{
        type:Date,
        required:true,
    },
    dateFin:{
        type:Date,
        required:true,
    },
    description: {
        type:String,
        required: false,
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: questionModel
    }],

    permission:{
        type:String,
    }
});
module.exports = mongoose.model('formation',formationSchema);