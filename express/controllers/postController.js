const Post=require("../models/postMethod");

//find in mongoose is asyncrhonous so we have to use async await
// const posts=await Post.find();
exports.getAllPost= async (req,res,next)=>{

    try{
        const posts=await Post.find();

        res.status(200).json({
            status: "sucess",
            results: posts.length,
            data:{
                posts,
            }
        })
    }catch(e){
        res.status(400).json({
            status: "bad req",
            results: posts.length,
            data:{
                posts,
            }
        })
    }
   
};


exports.getOnePost= async (req,res,next)=>{

    try{
        const posts=await Post.findById(req.params.id);

        res.status(200).json({
            status: "sucess",
            data:{
                posts,
            }
        })
    }catch(e){
        res.status(400).json({
            status: "bad req",
            data:{
                posts,
            }
        })
    }
   
};


exports.createPost= async (req,res,next)=>{

    try{
        const posts=await Post.create(req.body);

        res.status(200).json({
            status: "sucess",
            data:{
                posts,
            }
        })
    }catch(e){
        res.status(400).json({
            status: "bad req",
            data:{
                posts,
            }
        })
    }
   
};


exports.updatePost= async (req,res,next)=>{

    try{
        const posts=await Post.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true,
        })

        res.status(200).json({
            status: "sucess",
            data:{
                posts,
            }
        })
    }catch(e){
        res.status(400).json({
            status: "bad req",
            data:{
                posts,
            }
        })
    }
   
};


exports.deletePost= async (req,res,next)=>{

    try{
        const posts=await Post.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "sucess",
        
        
        })
    }catch(e){
        res.status(400).json({
            status: "bad req",
            results: posts.length,
            data:{
                posts,
            }
        })
    }
   
};
