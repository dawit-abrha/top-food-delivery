import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

function LoginPopup({ setShowLogin }) {

    const {url, setToken} = useContext(StoreContext)
    const [currentState, setCurrentState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))

    }
   
   const onLogin = async (event)=>{
    event.preventDefault();
    let newUrl =url;
    if(currentState === "Login"){
        newUrl += "/api/user/login";
    }
    else{
        newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
    }
    else{
        alert(response.data.message);
    }
   }


console.log(data)


    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currentState}</h2>
                    <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className='login-popup-input'>
                    {currentState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name ' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email ' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your password ' required />
                </div>
                <div className='login-popup-button'>
                    <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
                </div>
                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>
                        I agree to the Terms and Conditions and Privacy Policy.
                    </p>
                </div>
                {
                    currentState === "Login"
                        ?
                        <p>Create new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                        :
                        <p>Already have an account? <span onClick={() => setCurrentState("Login")}>login here</span> </p>
                }


            </form>

        </div>
    )
}

export default LoginPopup