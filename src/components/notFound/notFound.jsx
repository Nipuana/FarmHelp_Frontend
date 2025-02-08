import React from "react";
import "../../css/notFoundCss/notFound.css";
import Eor from "../../images/error_404.png";
import Footer from "../Common/Footer.jsx"

const NotFound = () => {
  return (
    <>
    <div className="not-found">
      <div className="content-box">
        <img className="img_404" src={Eor} alt="Vector image for 404" />
        <p>Oops! The page you are looking for does not exist.</p>
        <a href="/" className="home-link">Go Back to Home</a>
      </div>
      
    </div>
    
    </>
    
  );
};

export default NotFound;
