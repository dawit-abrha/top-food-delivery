import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className='header'>
        <div className="header-content">
          
            
            
        <h1>Welcome to Dawit's Kitchen: Where Flavor Meets Convenience</h1>
            {/* Link to navigate to the "Explore Menu" section */}
            <button> <a href="#explore-menu">View Menu</a></button>
        </div>
    </div>
  )
}

export default Header;
