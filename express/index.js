const express= require("express");
const mongoose= require("mongoose");

const app=express();
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

const redisClient = redis.createClient({
    host: 'localhost',  // Redis host
    port: 6379          // Redis port
});

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'your-secret-key', // Secret key to sign the session ID
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,    // Only accessible via HTTP (not JavaScript)
        secure: false,     // Set to true in production (HTTPS)
        maxAge: 24 * 60 * 60 * 1000  // Cookie expiration time (1 day)
    }
}));


function checkIfLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        // If the user is logged in, send the success response with user info
        return res.json({
            status: "success",
            user: req.session.user
        });
    } else {
        // If the user is not logged in, send the failure response with message
        return res.status(401).json({
            status: "fail",
            message: "Please log in first"
        });
    }
}


const port=process.env.port || 3001;

const postRouter=require("./routes/postRoutes");

const userRouter=require("./routes/userRoutes");

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

app.use(checkIfLoggedIn);

app.get("/",(req,res)=>{
console.log('data send');
res.send("<h1>hi?</h1>");
console.log('data send');
})

app.use(express.json());

app.use("/posts",postRouter);

app.use("/",userRouter);


app.listen(port,()=>{
    console.log(`running on ${port}`)
})

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                status: "fail",
                message: "Failed to log out"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Logged out successfully"
        });
    });
});