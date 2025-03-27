import React, { useContext, useEffect } from 'react'
import './verify.css'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verfiy =()=> {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get('orderId');
  const {url} =useContext(StoreContext)
  const navigate = useNavigate();

  console.log(success,orderId)

  const verifyPayment = async (req, res) => {
    const response = await axios.post(url+"/api/order/verify",{success,orderId})
    if(response.data.success){
      navigate("/myorders")
      console.log("Payment successful")
    }
    else{
      navigate("/")
      
    }
  }
  useEffect(()=>{
    verifyPayment()
  },[])

  
  return (
    <div className='verify'>
      <div className="spinner">

      </div>

    </div>
  )
}

export default Verfiy;