import React from "react";
import "../css/Body.css";

const FarmerLandingPage = () => {
  return (
    <div className="container">
      {/* Left Text Section */}
      <div className="text-section">
        <h1>
          All the <br /> products <br />
          <span className="highlight">for farmers</span>
        </h1>
        <p>Everything that you can ever hope of</p>
        <button className="register-button">Register</button>
      </div>

      {/* Right Illustration */}
      <div className="image-section">
        <img
          src="./images/m1_img.png"
          alt="Farmer illustration"
        />
      </div>
    </div>
  );
};

export default FarmerLandingPage;
