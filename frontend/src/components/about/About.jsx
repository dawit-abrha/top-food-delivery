import React from 'react';
import './About.css'; // You can add custom styles here to make it look more attractive.
import { assets } from '../../assets/assets';

function About() {
  return (
    <div className="about-container">
      <div className="about-text">
        <h1 className="about-heading">Welcome to Dawit's Food Haven!</h1>
        <p className="about-description">
          Hello! I'm Dawit, a passionate food maker who believes in the magic of good food to bring people together. 
          With years of experience and a love for creating mouthwatering dishes, I strive to serve up delicious 
          and unique flavors that make every meal memorable.
        </p>
        <p className="about-description">
          Whether you're here to enjoy a tasty meal or looking for inspiration for your next dish, you've come to 
          the right place. I pour my heart into every dish, ensuring that each one reflects my dedication to flavor, 
          quality, and love for cooking. Join me on this flavorful journey and discover food that delights the senses!
        </p>
      </div>

      <div className="about-image">
        <img src = 'https://github.com/dawit-abrha/cssas1/blob/main/admin.jpg?raw=true' alt="Dawit Cooking" />
      </div>

      <div className="about-footer">
        <p className="footer-text">Thank you for visiting, and I hope you enjoy the experience!</p>
      </div>
    </div>
  );
}

export default About;
