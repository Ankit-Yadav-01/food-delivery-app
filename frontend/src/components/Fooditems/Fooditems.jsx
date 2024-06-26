import React, { useContext, useState } from 'react'
import './Fooditems.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/Storecontext';
const Fooditems = ({id,name,price,description,image}) => {
  
    const {cartItems,addtocart,removefromcart,url}=useContext(StoreContext);
  return (
    <div className='food-items'>
        <div className="food-img-container">
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            {!cartItems[id] ?  <img className='add' onClick={()=>addtocart(id)} src={assets.add_icon_white}/>
            :<div className="food-item-counter">
                <img onClick={()=>removefromcart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img src={assets.add_icon_green} onClick={()=>addtocart(id)} alt="" />
            </div>
}
        </div>
        <div className="food-item-info">
            <div className="food-item-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-description">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default Fooditems