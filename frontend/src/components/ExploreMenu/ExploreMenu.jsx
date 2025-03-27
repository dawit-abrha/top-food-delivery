import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

function ExploreMenu({ category, setCategory }) {

  return (
    <div className='Explore-menu' id='explore-menu'>
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>
        Our menu is updated daily with the latest and most delicious dishes from around the world. 
        Enjoy our tasty and healthy options. Whether you're craving something savory or sweet, we have something for every taste!
      </p>

      {/* New section: About the Menu */}
      <div className="about-menu">
        <p className="about-menu-text">
          At Dawit's, we take pride in offering a wide variety of dishes made with fresh ingredients and a lot of love. 
          We ensure that each meal is crafted to deliver the best flavors to your doorstep. Explore our menu and choose from 
          an array of dishes that will surely satisfy your cravings.
        </p>
      </div>

      <div className="explore-menu-list">
        {
          menu_list.map((item, index) => (
            <div 
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
              key={index} 
              className='explore-menu-item'>
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          ))
        }
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu;
