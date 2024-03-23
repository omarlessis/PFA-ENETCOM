var mongoose = require('mongoose');
const studentModel = require('./studentModel');
const formationModel=require('./formationModel');
var Schema = mongoose.Schema;

var userFormationSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        Ref:studentModel
        
    },
    formation: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        Ref: formationModel
    },
    ]

   
});
module.exports = mongoose.model('userFormation',userFormationSchema );