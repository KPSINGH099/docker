const express= require("express");
const mongoose= require("mongoose");

const app=express();

const port=process.env.port || 3001;

const postRouter=require("./routes/postRoutes");

const {MONGO_IP,MONGO_PORT,MONGO_USER,MONGO_PASSWORD}= require("./config")


//username:passsword@ip:port 

//note we did not change any port 

//mongoose.connect("mongodb://kishan:kishan@172.19.0.2:27017?authSource=admin")

//mongoose automativaaly waits for 30 seconds to connect with db

//but we can implement our logic too

const connectWithRetry = () =>{
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin`)
    .then(()=>{
        console.log("sucessfully connected to db")
    }).catch((e)=>{
        console.log("db error occured")
        console.log(e)
        setTimeout(connectWithRetry,5000)
    })
}

connectWithRetry();

app.get("/",(req,res)=>{
console.log('data send');
res.send("<h1>ka bolti public namstey bolo bolo bolo?</h1>");
console.log('data send');
})

app.use(express.json());

app.use("/posts",postRouter);

app.listen(port,()=>{
    console.log(`running on ${port}`)
})