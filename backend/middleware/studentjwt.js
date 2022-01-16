const jwt = require('jsonwebtoken')
const JWT_VERIFY_STUDENT=(req,res,next)=>{
    const Auth=req.header('Authorization');
    const token=Auth.split(' ')[1];
    try
    {
        const public_key=process.env.STUDENT_KEY
        jwt.verify(token,public_key);
        req.studentinfo=null
        req.studentinfo=jwt.decode(token);
        
        next()
    }
    catch(err)
    {
        return res.json({err:["JWT missing","Please Login Again"]})
    }
}

module.exports=JWT_VERIFY_STUDENT