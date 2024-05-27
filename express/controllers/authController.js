const User=require("../models/userModel");


exports.signUp= async (req,res,next)=>{

    try{
        const user=await User.create(req.body);

        res.status(200).json({
            status: "sucess",
            data:{
                user,
            }
        })
    }catch(e){
        res.status(400).json({
            status: "bad req",
            data:{
                user,
            }
        })
    }
   
};