const express=require('express');
const nodemailer=require('nodemailer');
const router =express.Router();
const {studentsignin, studentsignup} =require('../Controller/student');
const { teachersignup, teachersignin } = require('../Controller/teacher');

const isvalidmail=(req,res,next)=>{
    const {email}=req.body;
    console.log(email)
    const reqs=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(reqs.test(email))
    {
        next();
    }
    else return res.json({mssg:"Email is not valid"})
}



router.post('/signin',studentsignin);
router.post('/signup',isvalidmail,studentsignup)
router.post('/s/t/signin',isvalidmail,teachersignin)
router.post('/s/t/signup',isvalidmail,teachersignup)
module.exports  =router