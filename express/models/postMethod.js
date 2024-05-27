const mongoose=require("mongoose");
const postSchema1=require("./postSchema.json")

/*console.log(postSchema1);
console.log(typeof(postSchema1));
const postsch1={
    title:{
        type:String,
        require:[true,"title is required"]
    },
    body:{
        type:String,
        require:[true,"body is required"]
    }
};
*/
console.log(typeof(postsch1));
const postSchema=new mongoose.Schema(
postSchema1
)

const Post=mongoose.model("Post",postSchema);

module.exports=Post;