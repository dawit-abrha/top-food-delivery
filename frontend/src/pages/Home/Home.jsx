import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/navbar/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDwonload/AppDownload';

function Home() {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      
      {/* About Dawit Section */}
      <section className="about-dawit">
        <div className="about-container">
          <h2 className="about-heading">Welcome to Dawit's Food Delivery Service!</h2>
          <p className="about-description">
            Hi, I'm Dawit! I'm passionate about cooking delicious and fresh meals that bring joy to your life. 
            My mission is to deliver high-quality, flavorful food straight to your doorstep, making it easier for 
            you to enjoy tasty meals at home without the hassle of cooking.
          </p>
          <p className="about-description">
            From comforting home-cooked dishes to exciting new recipes, I take great pride in preparing meals 
            that are not only mouth-watering but also convenient. Whether you're looking for a quick snack, a full 
            meal, or something special, I’ve got you covered. I believe that great food should be accessible to everyone, 
            and I’m here to bring it to you, wherever you are!
          </p>
          <p className="about-description">
            My goal is to offer you a seamless food delivery experience, ensuring that each meal is prepared with care 
            and delivered quickly to your door. Let's explore the world of flavors together, one meal at a time!
          </p>
        </div>
      </section>
      
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
}

export default Home;
