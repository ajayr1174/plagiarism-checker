const express=require('express');
const {User}=require('../Model/usermodel')
const jwt=require('jsonwebtoken');

const userkey=process.env.STUDENT_KEY;


const studentsignin=async (req,res)=>{
    try
    {
        let rollno=req.body.rollno;
        console.log(rollno);
        const user=await User.findOne({rollno:rollno});
        if(!user)
        {
            return res.status(401).json({err:"Wrong Rollno or Password"})
        }
        const ress=await user.comparepassword(req.body.password);
        
        if(ress.err)
        {
           return res.status(401).json({err:"wrong Rollno or Password"})
        }
        const resultant={rollno:user.rollno,email:user.email,name:user.name,id:user._id};
       
       const token =  jwt.sign(resultant,userkey,{expiresIn:'24h'});
       
       return res.json({mssg:"User Login Succesfully",token:token});
    }
    catch(err)
    {
        
        return res.json(err)
    }
};

const studentsignup=async (req,res)=>{
   
    try{
        const user=req.body;

        const newuser=  await new User(user)
        
        newuser.save((err,user)=>{
            if(err)
            {
                if(err.code===11000 && err.keyPattern.email===1)
                {
                    res.status(400).json("User already Exists");
                    return ;
                }
                if(err.code===11000 && err.keyPattern.rollno===1)
                {
                    res.status(400).json("Rollno already registered");
                    return ;
                }
                
                let arr=[];
                for(let k in err.errors)
                {
                    let obj={
                        "name":k,
                        "mssg":err.errors[k]
                    }
                    arr.push(obj);
                }
                return res.status(400).json({errmain:arr,errsec:err._message})
                
            }
            else
            {
              
                let user2={rollno:user.rollno,email:user.email,name:user.name,id:user._id};
                
                const token=  jwt.sign(user2,userkey,{expiresIn:'24h'});
                return res.status(201).json({mssg:"User Registered Successfully",token});
            }
        })
        
    }
    catch(err)
    {
        res.status(500).json({mssg:"Somthing Bad Happen"})
    }
}

module.exports={studentsignin,studentsignup}