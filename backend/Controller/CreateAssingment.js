const { Assement } = require("../Model/Assesments");
const crypto=require('crypto');
const { Copies } = require("../Model/studentcopies");

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


const submitAssingment=async(req,res)=>{

    console.log("hello");
   
    try {
        const subjectcode=req.params['id'];
        const studentid=req.studentinfo.id;
        const filepath=`./files/abc.txt`;
        const teacherId=req.teacherid;
        const save_ass=new Copies({filepath,subjectcode,submitted_id:studentid,student:studentid,teacherId});

        await save_ass.save();
            
        return res.json(save_ass)
        
    }
     catch (error) {
       return res.json({err:"Something Bad Happen",error})
    }
    
}

module.exports={CreateAssingment,viewAll,submitAssingment}