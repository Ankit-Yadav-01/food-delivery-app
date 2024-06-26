import React from 'react'
import './Menu.css'
import { menu_list } from '../../assets/assets'
const Menu = ({category,setcategory}) => {
  return (
    <div className='Menu' id='Menu'>
        <h1>Menu for today</h1>
        <p className='menu-text'>Browse through our extensive menu, place your order with just a few clicks, and enjoy fast, reliable delivery right to your doorstep.</p>
        <div className="menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="menu-list-item">
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default Menu