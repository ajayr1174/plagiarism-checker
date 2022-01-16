const mongoose=require('mongoose');
const ConnectApp=(app)=>{
    mongoose.connect('mongodb://localhost:27017/Plagram',{useUnifiedTopology:true}).then(()=>{
    app.listen(4000,()=>{
        console.log('server is Running at 4000')
    })
}).catch(()=>{
    console.log("Connection lost")
})
}
module.exports=ConnectApp
