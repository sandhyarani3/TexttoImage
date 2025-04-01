import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const registerUser=async(req,res)=>{
  try {
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.json({success:false,message:'Missing Details'})
    }
    const user1=await userModel.findOne({email})
    if(user1){
        return res.json({message:"user already exists"})
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const userData={
        name,
        email,
        password:hashedPassword
    }
    const newUser=new userModel(userData)
    const user=await newUser.save() 
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    return res.json({success:true,token,user:{name:user.name}})
  } catch (error) {
     console.log(error);
     res.json({sucsess:false,message:error.message})
  }
}

export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email})
        if(!user || !password){
            res.json({sucsess:false,message:'user does not exist'})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
           res.json({success:true,token,user:{name:user.name}})
        }
        else{
            res.json({sucsess:false,message:'Invalid credentials'})
        }
    } catch (error) {
        console.log(error);
     res.json({sucsess:false,message:error.message})
    }
}

export const userCredits=async(req,res)=>{
    try {
        const {userId}=req.body
        const user=await userModel.findById(userId)
        res.json({success:true,credits:user.creditBalance,user:{name:user.name}})
    } catch (error) {
        console.log(error.message)
        res.json({super:false,message:error.message})
    }
}
