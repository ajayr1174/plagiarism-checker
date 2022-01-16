const jwt=require('jsonwebtoken')
const express = require("express");
const fs=require('fs');
const path=require('path')
const JWT_VERIFY=(req,res,next)=>{
    const Auth=req.header('Authorization');
    const token=Auth.split(' ')[1];
    
    try
    {
        const public_key=fs.readFileSync(path.join(__dirname,'../','public.pem'));
        jwt.verify(token,public_key);
        req.teacherinfo=null
        req.teacherinfo=jwt.decode(token);
        
        next()
    }
    catch(err)
    {
        console.log(err)
        return res.json({err:["JWT missing","Please Login Again"]})
    }
}

module.exports=JWT_VERIFY