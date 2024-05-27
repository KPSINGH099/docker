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