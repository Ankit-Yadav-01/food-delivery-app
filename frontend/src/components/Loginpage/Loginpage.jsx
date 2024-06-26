import React, { useContext, useState } from 'react';
import './Loginpage.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/Storecontext';
import axios from 'axios';

const Loginpage = ({ setshowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;

    if (currState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }
    const response = await axios.post(newUrl, data);

    try {
      

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setshowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error logging in or signing up:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-title">
          <h2>{currState}</h2>
          <img onClick={() => setshowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" />
          )}
          <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Your email" required />
          <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder="Your password" required />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By Continuing, you agree to our Terms & Conditions</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here </span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Click here </span></p>
        }
      </form>
    </div>
  );
};

export default Loginpage;
