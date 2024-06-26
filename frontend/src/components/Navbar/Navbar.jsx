import "./Navbar.css";
import { Profiler, useContext, useState } from "react";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from "../../assets/assets";

import { StoreContext } from "../../Context/Storecontext";

const Navbar = ({ setshowlogin }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotal, token, setToken } = useContext(StoreContext);
  const navigate=useNavigate();
  const Logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }
  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>Home</Link>
        <a href='#Menu' className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>Menu</a>
        <a href='#app-download' className={menu === "mobile-app" ? "active" : ""} onClick={() => setMenu("mobile-app")}>Mobile App</a>
        <a href='#footer' className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='./cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotal() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setshowlogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" />Orders</li>
              <hr />
              <li onClick={Logout}><img src={assets.logout_icon} alt="" />logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
