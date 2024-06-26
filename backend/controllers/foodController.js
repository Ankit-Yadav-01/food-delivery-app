import foodModel from "../models/foodmodels.js";
import fs from 'fs'

// add food items

const addFood=async(req,res)=>{
    let image_name=`${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_name
    })
    try{
        await food.save();
        res.status(200).json({message:"Food added successfully"})
    } catch(error){
        console.log(error)
        req.json({success:false,message:"Error"})
    }
}




//food list

const foodlist=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


//removing food items

const removeFood=async(req,res)=>{
    try{
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}
export {addFood,foodlist,removeFood}