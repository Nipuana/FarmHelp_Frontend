import React from "react";
import "../../css/Body.css";

const Body = () => {
  return (
    <div className="container">
    
      <div className="text-section">
        <h1>
          All the necessary <br /> products <br />
          <span className="highlight">for farmers</span>
        </h1>
        <p>Everything that you can ever hope of</p>
        <button className="register-button">Register</button>
      </div>

      
      <div className="image-section">
        <img
          src="FarmHelp_Frontend\src\images\m1_img.png"
          alt="Farmer illustration"
        />
      </div>
    </div>
  );
};

export default Body;
