import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

function Navbar() {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <img className = "profile" src="https://github.com/dawit-abrha/cssas1/blob/main/admin.jpg?raw=true" alt="" />

    </div>
  )
}

export default Navbar