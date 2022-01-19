const mongoose = require("mongoose");
const validator=require('mongoose-unique-validator')
const StudentCopies=new mongoose.Schema({
    submitted_id:{
        type:String,
        required:true,
        
        // index:true,
    },
    filepath:{
        type:String,
        required:true
    },
    subjectcode:
    {
        type:String,
        required:true,
        
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
    },
    plag:{
        type:String,
        default:`0`
    }
})
// StudentCopies.plugin(validator);
const Copies=mongoose.model('sheets',StudentCopies);
module.exports={Copies}