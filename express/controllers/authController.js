const User=require("../models/userModel");

const bycrypt=require("bcryptjs");

exports.signUp= async (req,res,next)=>{
    const {username,password}= req.body;
  
    try{

        const hashpassword= await bycrypt.hash(password,12);

        const user=await User.create({
            username,
            password:hashpassword,
        });

        res.status(200).json({
            status: "sucess",
            data:{
                user,
            }
        })
    }catch(e){
        res.status(400).json({
            status: "bad req"
        })
    }
   
};


exports.login= async (req,res,next)=>{
    const {username,password}= req.body;
  
    try{
        
        const user=await User.findOne({username});
        //if we dont have user with that username
       if(!user){
        res.status(404).json({
            status: "fail",
            message: "user not found",
        })
       }
      
       //if we do have user with that check if password entered by user 
       //is equal to password stored in db after decrypting it 
       const isCorrect=await bycrypt.compare(password,user.password)

       if(isCorrect){
        res.status(200).json({
            status: "sucess"
        })
       }
      else{
        res.status(404).json({
            status: "fail",
            message: "incorrect password",
        })
      }
    }catch(e){
        res.status(400).json({
            status: "bad req"
        })
    }
   
};