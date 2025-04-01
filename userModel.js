import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    creditBalance:{type:Number,default:5}
})
const userModel=mongoose.models.user || mongoose.model("user",userSchema)
//this above line search if model named user exists or not ,if no create model with user and assign refernce to userModel
export default userModel;