import React, { useContext } from 'react'
import './Food.css'
import Fooditems from '../Fooditems/Fooditems'
import { StoreContext } from '../../Context/Storecontext'

const Food = ({category}) => {
    const {food_list}=useContext(StoreContext)
  return (
    <div className='food' id='food'>
        <h2>Here are our Top Dishes</h2>
        <div className="food-list">
          {food_list.map((item,index)=>{
            if(category==="All" || category===item.category){
              return <Fooditems key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            }
            
          })}
        </div>
    </div>
  )
}

export default Food