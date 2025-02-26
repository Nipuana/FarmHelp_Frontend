import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../css/HomeCss/homeBody.css";
import farmingImage from "../../images/dash_tbg.png"; 
import illst_1 from '../../images/product_img.png'
import sell1 from '../../images/sell1.png';
import sell2 from '../../images/sell2.png';
import sell3 from '../../images/sell3.png';

function App() {
  // References for scroll animations
  const servicesRef = useRef(null);
  const infoRef = useRef(null);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe sections for animations
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (infoRef.current) observer.observe(infoRef.current);
    
    return () => {
      if (servicesRef.current) observer.unobserve(servicesRef.current);
      if (infoRef.current) observer.unobserve(infoRef.current);
    };
  }, []);

  return (
    <div className="container_h">
      {/* Hero Section */}
      <div className="hero_h">
        <img src={farmingImage} alt="Farming" className="hero-image_h" />
        <div className="hero-text_h">
          <h1>Empower Your Farming with Quality Products</h1>
          <p className="hero-subtitle">Your one-stop destination for all farming products and equipment</p>
          <div className="hero-buttons">
            <Link to="/product" className="hero-btn primary">Browse Products</Link>
            <Link to="/about-us" className="hero-btn secondary">Learn More</Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="services-section_h" ref={servicesRef}>
        <h2 className="section-title_h">Our Services</h2>
        <p className="section-subtitle">Providing everything farmers need to thrive</p>
        <div className="services-grid_h">
          <div className="service-item_h">
            <div className="service-icon-container">
              <img src={sell1} alt="Farming tools" className="service-icon_h" />
            </div>
            <h3 className="service-title_h">Farming Tools</h3>
            <p className="service-description_h">
              High-quality farming tools that are durable, efficient, and designed for maximum productivity in the field.
            </p>
            <Link to="/product?category=tools" className="service-link">View Tools</Link>
          </div>
          
          <div className="service-item_h">
            <div className="service-icon-container">
              <img src={sell2} alt="Farming chemicals" className="service-icon_h" />
            </div>
            <h3 className="service-title_h">Agricultural Chemicals</h3>
            <p className="service-description_h">
              Safe and effective pesticides, fertilizers, and other agricultural chemicals to protect and nourish your crops.
            </p>
            <Link to="/product?category=chemicals" className="service-link">View Chemicals</Link>
          </div>
          
          <div className="service-item_h">
            <div className="service-icon-container">
              <img src={sell3} alt="Renting machinery" className="service-icon_h" />
            </div>
            <h3 className="service-title_h">Machinery Solutions</h3>
            <p className="service-description_h">
              Modern farming equipment available for purchase or rent, from tractors to specialized harvesting machinery.
            </p>
            <Link to="/product?category=machinery" className="service-link">View Machinery</Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info_h" ref={infoRef}>
        <div className="info-text_h">
          <span className="info-badge">Why Choose Us</span>
          <h3>Avoid Hidden Costs & Counterfeit Products</h3>
          <p>
            Buying farming equipment from unauthorized sellers can lead to significant hidden costs, 
            substandard quality, and no warranty protection. Our platform ensures you get authentic, 
            reliable products at fair prices, with proper documentation and after-sales support.
          </p>
          <ul className="info-benefits">
            <li>Verified authentic products</li>
            <li>Competitive transparent pricing</li>
            <li>Quality assurance guarantee</li>
            <li>Expert customer support</li>
          </ul>
          <Link to="/about-us">
            <button className="learn-more_h">
              Learn More
              <span className="btn-arrow">→</span>
            </button>
          </Link>
        </div>
        <div className="info-image-container">
          <img src={illst_1} alt="Illustration" className="info-image_h" />
        </div>
      </section>
      
      {/* CTA Section (New) */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to enhance your farming experience?</h2>
          <p>Browse our extensive catalog of farming products today.</p>
          <Link to="/product">
            <button className="cta-button">Shop Now</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default App;