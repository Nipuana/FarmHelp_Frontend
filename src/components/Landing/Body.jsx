import React from "react";
import  bg from "../../images/landing_farmer.png";
import "../../css/LandingCss/Body.css";
import { Link } from 'react-router-dom';

const Body = () => {
  return (
    
    <div className="container">
    
      <div className="text-section">
        <h1>
          All the necessary <br /> products <br />
          <span className="highlight">for farmers</span>
        </h1>
        <p>Everything that you can ever hope of</p>
        <Link to="/Register">
          <button className="registerr-button">Register</button>
        </Link>
        
        
        <Link to="/Login">
          <button className="loginn-button">Login</button>
        </Link>
      </div>

      
      <div className="image-section">
        <img
          className="img_bdy"
          src= {bg}
          alt="Farmer illustration"
        />
      </div>
    </div>
    
  );
};

export default Body;
