const mongoose=require("mongoose");
const userSchema1=require("./userSchema.json")

const userSchema=new mongoose.Schema(
userSchema1
)

const User=mongoose.model("User",userSchema);

module.exports=User;