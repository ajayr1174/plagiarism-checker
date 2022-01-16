const express=require('express');
const JWT_VERIFY = require('../middleware/jwtmiddleware');
const router=express.Router();
const JWT_VERIFY_STUDENT=require('../middleware/studentjwt')
const { CreateAssingment, viewAll, submitAssingment } = require('../Controller/CreateAssingment');
const { Assement } = require('../Model/Assesments');
const { Copies } = require('../Model/studentcopies');


const checkValidate=(req,res,next)=>{
    if(req.body.subject===undefined || req.body.year===undefined || req?.teacherinfo===null)
    {
        return res.json({err:"Please fill out all details"});
    }
    else
    next()
}

const valid_params=async(req,res,next)=>{
    const params=req.params['id'];
    const data=await Assement.findOne({subjectcode:params}).populate('teacher');
    if(data)
    {
        req.AssementData=data;
        req.teacherid=data.teacher._id;
        next()
    }
    else
    {
        return res.json(404,{err:" Bad Request or Please ask for url from Teacher or No such assingment exists"})
    }
}

router.post("/t/create", JWT_VERIFY,checkValidate,CreateAssingment);
router.get('/t/view',JWT_VERIFY,viewAll)
router.post('/submit/:id',JWT_VERIFY_STUDENT, valid_params,submitAssingment)



module.exports=router