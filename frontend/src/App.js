import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/myOrders/MyOrder";
import About from "./components/about/About";

function App() {
const [showLogin, setShowLogin] = useState(false)



  return (
    <>
    {showLogin?<LoginPopup setShowLogin ={setShowLogin} />:<></>}
      <div className="app">
        <Navbar setShowLogin = {setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/about" element={<About />} />

        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
