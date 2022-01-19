const { Assement } = require("../Model/Assesments");
const crypto=require('crypto');
const { Copies } = require("../Model/studentcopies");
const path=require('path')
const {fork}=require('child_process')
const CreateAssingment=async(req, res) => {
    try
    {
        const {subject,year}=req.body;
        let random=crypto.randomBytes(25).toString('hex');
        const subjcode=`${subject.replace(/\s/g,'').toLowerCase()}${random}`;   
        const id=req.teacherinfo.id;
        const assement=await new Assement({teacher:id,subjectcode:subjcode,subject,year});
        const success=assement.save();
        if(success)
        {
            res.status(201).json(assement);
        }
        else
        {
            res.status(500).json({err:"Something went wrong"})
        }
    }
    catch(err)
    {
        res.json({err:"SOmthing went wrong"});
    }

}

const viewAll=async(req,res)=>{
    
    try {
        console.log(req.teacherinfo)
        const fetchdata=await Assement.find({teacher:req.teacherinfo.id}).select(['subject','_id','subjectcode','createdAt']).sort({createdAt:-1})
        res.json(fetchdata)

    } catch (error) {
        res.json({msg:"Fail to fetch the INfo"})
    }
}

const seeParticular= async(req,res)=>{
    try
    {
        console.log('runnoing')
        const id=req.params['id'];
        console.log(id)
        const fetchData=await Copies.find({subjectcode:id}).populate("student");
        const newData=[];
        fetchData.map((item)=>{
            const newp={};
            newp.id=fetchData._id
            newp.name=item.student.fname+' '+item.student.lname;
            newp.rollno=item.student.rollno
            newp.plag=item.plag
            newData.push(newp)
        })
        return res.json(newData)
    }
    catch(err)
    {
        return res.json(err)
    }
}

const submitAssingment=async(req,res)=>{

   console.log("hello");
   console.log(req.files.file);
    if(!req.files)
    {
        return res.status(400).json({msg:"File required"})
    }
    try {
        let random=crypto.randomBytes(25).toString('hex');
        const newfilepath=path.join(__dirname,'../','Files',random+req.files.file.name);
        console.log("HEr")
        
        await req.files.file.mv(newfilepath)
        console.log("SS")
        const subjectcode=req.params['id'];
        const studentid=req.studentinfo.id;
        
        const filepath=`./Files/${random}${req.files.file.name}`;
        const teacherId=req.teacherid
        const save_ass=new Copies({filepath,subjectcode,submitted_id:studentid,student:studentid,teacherId});

        await save_ass.save();
        const forked=fork('./Controller/main.js')
        forked.send({
            studentid,
            subjectcode,
            teacherId,
            data:{
                save_ass
            }
        })
        return res.json(save_ass)
 
    }
     catch (error) {
       return res.json({err:"Something Bad Happen",error})
    }
    
}

module.exports={CreateAssingment,viewAll,submitAssingment,seeParticular}