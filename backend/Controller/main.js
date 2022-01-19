


const fs=require('fs')
const path=require('path')
const {Copies}=require('../Model/studentcopies')
const express=require('express')
const mongoose=require('mongoose')

class TwoD
{
   constructor(row,col)
   {
       this.row=row;
       this.col=col;
   }
   __init()
   {
       this.arr=[];
       this.arr=new Array(this.row+5);
       for(let u=0;u<=this.row;u++)
       {
           this.arr[u]=new Array(this.col+5);
       }
       for(let i=0;i<=this.row;i++)
       {
           for(let j=0;j<=this.col;j++)
           {
               
               this.arr[i][j]=0;
           }
       }
       return this.arr;
   }
}
class EditDistance
{
    constructor(str,str2,arr)
    {
        
        this.str=str;
        this.str2=str2;
        this.dp=arr;
      
    }
    calc()
    {
        for(let i=0;i<=this.str.length;i++)
        {
            for(let j=0;j<=this.str2.length;j++)
            {
                if(i===0)this.dp[i][j]=j;
                if(j===0)this.dp[i][j]=i;

            }
        }
        for(let i=1;i<=this.str.length;i++)
        {
            for(let j=1;j<=this.str2.length;j++)
            {
                if(this.str[i-1]===this.str2[j-1])
                {
                    this.dp[i][j]=this.dp[i-1][j-1]
                }
                else
                {
                    this.dp[i][j]=1+ Math.min(this.dp[i-1][j-1],this.dp[i-1][j],this.dp[i][j-1]);
                }
            }
        }
        


        return this.dp[this.str.length][this.str2.length]
    }
}


class ReadFile
{
    constructor(filename)
    {
        this.filename=filename
    }
    returnstring()
    {
        this.reqpath=path.join(__dirname,"../",this.filename);
        this.file=fs.readFileSync(this.reqpath);
        this.filedata=this.file.toString();

       this.formatteddata=this.filedata.replace(/(\r\n|\n|\r)/gm,"");
        return this.formatteddata
    }

}
// let fileone=new ReadFile('main1.txt',"Text")
// let filetwo=new ReadFile('main3.txt','Text')
// const file=fileone.returnstring()
// const file2=filetwo.returnstring();
// console.log(file2.length,file.length)
// filetwo=null;
// fileone=null

// let arr=new TwoD(file2.length,file.length).__init();
// let plag=new EditDistance(file2,file,arr).calc()
// console.log(plag)

//  const percentageplag=100-Math.round(plag/(Math.max(file.length,file2.length))*100)

// // let percentageplag=plag/file.length *100;

// console.log(`${percentageplag}% in files`)


// console.log(`${percentageplag}% for file 2`)

process.on('message',async(message)=>{

    mongoose.connect('mongodb://localhost:27017/Plagram',{useUnifiedTopology:true}).then(async ()=>{
       
        try{
        const getAllAssinment=await Copies.find({subjectcode:message.subjectcode});
        
        const newData=getAllAssinment.filter((item)=>item._id!=message.data.save_ass._id);
            console.log(message.data.save_ass)
            let superFile=new ReadFile(message.data.save_ass.filepath).returnstring()
            console.log(superFile.length)
            const len1=Math.min(2000,superFile.length);
            let highPlag=0;
            console.log(newData)
            for(let i=0;i<newData.length;i++)
            {

                let currentFilePlag=parseInt(newData[i].plag);
                
                let currentFile=new ReadFile(newData[i].filepath).returnstring();
              
                const len2=Math.min(2000,currentFile.length);
                let arr=new TwoD(len1,len2).__init();
              
                let plag=new EditDistance(superFile.slice(0,2000),currentFile.slice(0,2000),arr).calc();
                plag=100-Math.round((plag/(Math.max(len1,len2))*100))
                
                if(plag>currentFilePlag)
                {
                    const update=await Copies.findByIdAndUpdate(newData[i]._id,{plag:plag},{upsert:true});
                }
                highPlag=Math.max(highPlag,plag);
            }
            console.log(highPlag)
            const newUpdate=await Copies.findByIdAndUpdate(message.data.save_ass._id,{plag:highPlag},{upsert:true});
            console.log(newUpdate)

        }
        catch(err)
        {
            console.log(err)
        }
    })
    .catch(()=>{
        console.log("error")
    })
    
})