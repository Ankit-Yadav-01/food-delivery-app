import mongoose, { connect } from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://ay0817586:Ankit1702@cluster0.tis6ecn.mongodb.net/food-del').then(()=>console.log("DB connected"))
}
