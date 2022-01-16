


const fs=require('fs')
const path=require('path')
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
    constructor(filename,dirname)
    {
        this.filename=filename
        this.dirname=dirname
    }
    returnstring()
    {
        this.reqpath=path.join(__dirname,"../","Files",this.dirname,this.filename);
        this.file=fs.readFileSync(this.reqpath);
        this.filedata=this.file.toString();

       this.formatteddata=this.filedata.replace(/(\r\n|\n|\r)/gm,"");
        return this.formatteddata
    }

}
let fileone=new ReadFile('main1.txt',"Text")
let filetwo=new ReadFile('main3.txt','Text')
const file=fileone.returnstring()
const file2=filetwo.returnstring();
console.log(file2.length,file.length)
filetwo=null;
fileone=null

let arr=new TwoD(file2.length,file.length).__init();
let plag=new EditDistance(file2,file,arr).calc()
console.log(plag)

 const percentageplag=100-Math.round(plag/(Math.max(file.length,file2.length))*100)

// let percentageplag=plag/file.length *100;

console.log(`${percentageplag}% in files`)


console.log(`${percentageplag}% for file 2`)
