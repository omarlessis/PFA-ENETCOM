var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    firstname:{
        type: String,
        required:true,
        
    },
    lastname:{
        type:String,
        required:true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        
    },
    role:{
        type :String,
        required :true,
    },
    phoneNumber:{
        type : Number,
        required : false,
    },
    picture:{
        type:String,
        required : false,
    },
    // messages: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Message',
    //     },
    //   ],
    permission:{
        type:String,
    }
   
});
module.exports = mongoose.model('student',StudentSchema);