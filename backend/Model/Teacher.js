const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const TeacherSchema=new mongoose.Schema({
     lname:{
         type:String,
         required:true
     },
     fname:{
        type:String,
        required:true
    },
    phoneno:{
        type:Number,
        required:true
    },
     email:{
         type:String,
         required:true,
         unique:true
     },
     password:{
         type:String,
         required:true
     }
 })
 
 TeacherSchema.pre('save',function(next){
     if(!this.isModified('password'))
     {
         return next();
     }
     this.password=bcrypt.hashSync(this.password,10);
     next();
 })
 
 TeacherSchema.methods.comparepassword= function(data){
     const dataa=bcrypt.compareSync(data,this.password);
     if(dataa)
     {
        return {msg:"Login Suceesss"}
     }
     else
     return {err:"Wrong Email or Password"}
 }
 const Teacher=mongoose.model('Teacher',TeacherSchema);
 module.exports={Teacher}