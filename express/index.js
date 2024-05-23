const express= require("express");

const app=express();

const port=process.env.port || 3001;

app.get("/",(req,res)=>{
console.log('data send');
res.send("<h1>ka bolti public namstey?</h1>");
console.log('data send');
})


app.listen(port,()=>{
    console.log(`running on ${port}`)
})