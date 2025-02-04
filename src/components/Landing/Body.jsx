import React from "react";
import  bg from "../../images/landing_farmer.png";
import "../../css//LandingCss/Body.css";

const Body = () => {
  return (
    
    <div className="container">
    
      <div className="text-section">
        <h1>
          All the necessary <br /> products <br />
          <span className="highlight">for farmers</span>
        </h1>
        <p>Everything that you can ever hope of</p>
        <button className="registerr-button">Register</button>
        <button className="loginn-button">Login</button>
      </div>

      
      <div className="image-section">
        <img
          src= {bg}
          alt="Farmer illustration"
        />
      </div>
    </div>
    
  );
};

export default Body;
