let c=0;
setInterval(()=>{
    for(let i=0;i<100;i++)
    {
        console.log(i);
    }
    c++;
    if(c==4)
    {
        process.exit();
    }

},1000)
