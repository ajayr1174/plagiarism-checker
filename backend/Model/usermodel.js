const mongoose=require('mongoose')
const bcrpt=require('bcrypt')
const usermodel=mongoose.Schema({
    rollno:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    fname:{
        type:String,
        required:true
    }
})

const activeuser=mongoose.Schema({
    token:{
        type:String
    },
    isactive:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})



usermodel.pre("save",function(next){
    if(!this.isModified) return next()
    this.password=bcrpt.hashSync(this.password,10);
    next();
})
usermodel.methods.comparepassword= function (data){
    
    const data1=bcrpt.compareSync(data,this.password);
    if(data1)
    {
        return {msg:"Login Suceesss"}
    }
    return {err:"Wrong Email or Password"}
}

const Activeuser=mongoose.model('active',activeuser);
const User=mongoose.model('User',usermodel)
module.exports={User,Activeuser}