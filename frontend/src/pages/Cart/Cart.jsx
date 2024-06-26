import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from "../../Context/Storecontext"
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removefromcart, getTotal, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removefromcart(item._id)} className='remove-from-cart'>x</p>
                </div>
                <hr />
              </div>
            )
          }
          return null; // To avoid returning undefined if the condition is false
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotal()}</p>
            </div>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Shipping Charges</p>
            <p>${getTotal() === 0 ? 0 : 1}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotal() === 0 ? 0 : getTotal() + 1}</b>
          </div>
          <button onClick={() => navigate('/order')}>Checkout Now</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If Any, Enter Your Promocode Here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
