const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const jwt=require('jsonwebtoken')
const ConnectApp=require('./Config/db')
const userroute=require('./Routes/userroute')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors());
const Assing=require('./Routes/Assing');
const JWT_VERIFY_STUDENT = require("./middleware/studentjwt");


app.use('/user',userroute)
app.use('/assingment',Assing);


app.get("/confirm", JWT_VERIFY_STUDENT,(req, res) => {
    return res.json({mg:req.studentinfo})
    
});
app.get('/',(req,res)=>{
    return res.send('Base Router')
})
ConnectApp(app)
