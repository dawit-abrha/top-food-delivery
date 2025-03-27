import React, { useContext } from 'react'
import './Navbar.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../../context/StoreContext';

function Navbar({setShowLogin}) {
const [menu, setMenu] = useState("home");
const {getTotalCartAmount,token,setToken }= useContext(StoreContext);
const navigate = useNavigate();

const logout = () =>{
localStorage.removeItem('token');
setToken("")
navigate('/');
window.location.reload();
}

  return (
    <div className='navbar'>
        <Link to = '/'><img src= {assets.logo} alt=""  className='logo'/>@Dawit</Link>
        <ul className='navbar-menu'>
            <Link to ='/' onClick = {() => setMenu("home")} className = {menu === "home"?"active":""}>Home</Link>
            <a href= "#explore-menu" onClick = {() => setMenu("menu")} className = {menu === "menu"?"active":"" }>menu</a>
            <a href= "#app-download" onClick = {() => setMenu("mobile-app")} className = {menu === "mobile-app"?"active":""}>mobile-app</a>
            <a href= "#footer" onClick = {() => setMenu("contact")} className= {menu === "contact"?"active":""}>contact</a>
            <a href= "#about" onClick = {() => setMenu("About")} className= {menu === "contact"?"active":""}>About Us</a>
            {
              token?<button onClick={logout}>logout</button>:null  // conditional rendering for logout button only when token is present  // token is set in the StoreContext when user logs in successfully  // logout function is defined in App.js  // localStorage.removeItem is used to remove the token from local storage when user logs out  // navigate('/') is used to redirect user to home page when they click on logout button  // if token is not present, user will see a sign in button instead of a logout button  // the logout button is only visible when user is logged in  // the dropdown menu is hidden when user is not logged in  // the dropdown menu is displayed when user is logged in  // the dropdown menu has a profile picture and a list of orders and logout options  // the dropdown menu has a horizontal line to separate orders and logout options  // the dropdown menu has a logout option when user is logged in  // the dropdown menu has an order option when user is
            }
        </ul>
        <div className='navbar-right'>
                {/* <img src={assets.search_icon} alt=""  /> */}
                <div className='navbar-search-icon'>
                    <Link to='/Cart'><img src= {assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>
                {
                  !token?<button onClick={()=>setShowLogin(true)}> sign in</button>
                  :
                  <div className="navbar-profile">
                    <img src={assets.profile_icon} alt="" />
                    <ul className='navbar-ptofile-dropdown'>
                      <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                      <hr />
                      <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                    </ul>
                    
                  </div>
                }
                
            </div>
    </div>
  )
}

export default Navbar