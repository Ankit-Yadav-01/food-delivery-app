import React, { useContext, useEffect, useState } from 'react';
import './Order.css';
import { StoreContext } from '../../Context/Storecontext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Order = () => {
  const { getTotal, food_list, token, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
    alternatephone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    if (!food_list) {
      alert("Food list is not available");
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotal() + 2,
    };

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      console.log(response);
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Error placing order. Please try again.");
    }
  };
  const navigate=useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart')
      
    }
    else if(getTotal()===0){
      navigate('/cart')
    }
  },[token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="order-left">
        <p className='Delivery-title'>Delivery Information</p>
        <div className="two-fields">
          <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name' />
          <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
        </div>
        <div className="two-fields">
          <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
          <input type="text" name='landmark' onChange={onChangeHandler} value={data.landmark} placeholder='Landmark' />
        </div>
        <div className="two-fields">
          <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
          <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>
        <div className="two-fields">
          <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip Code' />
          <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
        </div>
        <div className="two-fields">
          <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone Number' />
          <input type="text" name='alternatephone' onChange={onChangeHandler} value={data.alternatephone} placeholder='Alternate Phone Number' />
        </div>
      </div>
      <div className="order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotal()}</p>
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
          <button type='submit'>Proceed To Pay</button>
        </div>
      </div>
    </form>
  );
};

export default Order;
