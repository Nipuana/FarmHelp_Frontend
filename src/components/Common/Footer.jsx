import React from "react";
import "../../css/Common/Footer.css";
import  Wlogo from "../../images/white_logo.png";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={Wlogo} alt="Logo" className="footer-logo-img" />
          
        </div>
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="#about">About us</a></li>
            <li><a href="#review">Review</a></li>
            <li><a href="#product">Product</a></li>
            <li><a href="#rating">Rating</a></li>
            <li><a href="#faqs">FAQs</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Support</h2>
          <ul>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#status">Status</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Stay up to date</h3>
          <form>
            <input type="email" placeholder="Your email address" />
            <button type="submit">
              <span role="img" aria-label="Send">✈️</span>
            </button>
          </form>
        </div>
      </div>
   
    </footer>
  );
};

export default Footer;
