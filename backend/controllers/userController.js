import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"Invalid email or password"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid email or password"})

        }
        const token=createToken(user._id)
        res.json({success:true,token})


    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}


const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const registerUser=async(req,res)=>{
    const {name,password,email}=req.body
    try{
        const check=await userModel.findOne({email})
        if(check){
            return res.json({success:"false",message:"User already exists"})
        }
        //for using validator
        if(!validator.isEmail(email)){
            return res.json({success:"false",message:"Invalid email"})
        }
        if(password.length<8){
            return res.json({success:"false",message:"Password must be at least 8 characters long"})
        }
        //for using bcrypt
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser=new userModel({name,email,password:hashedPassword})
        const user=await newUser.save();
        const token=createToken(user._id);
        res.json({success:"true",token})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"An error occured"})

    }
}
export {loginUser,registerUser}
