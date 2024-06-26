import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)
import axios from 'axios'

const StoreContextProvider=(props)=>{
    const [cartItems,setcartItems]=useState({});
    const url="http://localhost:4000"
    const [token,setToken]=useState("");
    const[food_list,setfoodList]=useState([])

    const addtocart=async(itemId)=>{
        if(!cartItems[itemId]){
            setcartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
            
        }
    }
    const removefromcart=async(itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
    }
    

    const getTotal=()=>{
        let total=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                //total+=cartItems[item]*food_list[item].price;
            let itemInf=food_list.find((product)=>product._id===item);
            total+=cartItems[item]*itemInf.price;
            }
        }
        return total;
    }



    const fetchFoodList=async()=>{
        const response=await axios.get(url+"/api/food/list");
        setfoodList(response.data.data)
        
     
    }

    const loadCartData=async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setcartItems(response.data.cartData);
    }
    useEffect(()=>{
        
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])
    
    const contextValue ={
        food_list,
        cartItems,
        setcartItems,
        addtocart,
        removefromcart,
        getTotal,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;