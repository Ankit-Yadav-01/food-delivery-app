import userModel from '../models/userModel.js'


//add to cart
const addToCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId)
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]= 1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added To Cart"})
    } catch (error) {
        console.log(error);
    }
}


//remove items
const removeFromCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId)
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
            res.json({success:true,message:"Removed from Cart"})
        }
    
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        

    }
    catch(error){
        console.log(error)
        res.json({message:"an error occured"})
    }

}

//fetch data
const getCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Cart data not found"})
    }
}
export {addToCart,removeFromCart,getCart}