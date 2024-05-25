const express= require("express");
const mongoose= require("mongoose");

const app=express();

const port=process.env.port || 3001;


//username:passsword@ip:port 

//note we did not change any port 

//mongoose.connect("mongodb://kishan:kishan@172.19.0.2:27017?authSource=admin")
mongoose.connect("mongodb://kishan:kishan@mongo?authSource=admin")
.then(()=>{
    console.log("sucessfully connected to db")
}).catch((e)=>{
    console.log(`db error ${e}`)
})

app.get("/",(req,res)=>{
console.log('data send');
res.send("<h1>ka bolti public namstey bolo bolo bolo?</h1>");
console.log('data send');
})


app.listen(port,()=>{
    console.log(`running on ${port}`)
})