import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

function Footer() {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <img src={assets.logo} alt="" />
                    <p>
                        &copy; 2025 FoodApp. All rights reserved.
                    </p>
                    <div className='footer-social-icons'>
                        <img src ={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                        

                    </div>

                </div>
                <div className='footer-content-center'>
                    <h2>Amsterdam</h2>
                    <ul>
                        <li>Home</li>
                        <li>About-us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>

                </div>

                <div className='footer-content-right'>
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>Phone: +31686371240</li>
                        <li>Email:wediabrhana@gmail.com</li>
                    </ul>

                </div>
                
            </div>
            <p className="footer-copyright">
                <span>Terms and Conditions</span> | <span>FAQ</span> | <span>Cookie Policy</span> | <span>Privacy Policy</span> | <span>Sitemap</span> | <span>Accessibility</span> | <span>Help</span> | <span>Contact Us</span> | <span>2025 FoodApp. All rights reserved.</span>
            </p>
            <hr />

        </div>
    )
}

export default Footer