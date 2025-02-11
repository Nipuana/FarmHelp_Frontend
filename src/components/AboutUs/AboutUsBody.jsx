import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import '../../css/AboutUsCss/AboutUsBody.css';
import Abt_bg from '../../images/AbtUs_bg.jpg';
import tractor from '../../images/Tractor_1.jpeg';
import sell1 from '../../images/sell1.png';
import sell2 from '../../images/sell2.png';
import sell3 from '../../images/sell3.png';

export default function AboutUs() {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="main-container">
      {/* Header Section */}
      <header className="header-section" style={{ backgroundImage: `url(${Abt_bg})` }}>
        <div className="overlay"></div>
        <div className="header-content">
          <h1 className="header-title">About Us</h1>
          <p className="header-description">
            From farming materials to farming chemicals like insecticides, pesticides, and machines, we have everything covered for farmers.
          </p>
          <button className="header-button" onClick={scrollToSection}>See More</button>
        </div>
      </header>

      {/* Main Section */}
      <main className="main-section">
        {/* Section to Scroll To */}
        <section className="products-section" ref={sectionRef}>
          <div className="product-content">
            <h2 className="section-title">Providing goods for farmers all across Nepal</h2>
            <p className="product-description">
              We maintain the quality of goods for all the products that we provide. If the rented products get damaged, we expect you to compensate us thoroughly.
            </p>
            <Link to="/product">
              <button className="product-button">Go To Products</button>
            </Link>
          </div>
          <div className="product-image-container">
            <img
              src={tractor}
              alt="Tractor in the field"
              className="product-image"
            />
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <img src={sell1} alt="Farming tools" className="service-icon" />
              <h3 className="service-title">Selling Farming Tools</h3>
              <p className="service-description">
                We provide farming tools for farmers that fulfill all their needs.
              </p>
            </div>
            <div className="service-item">
              <img src={sell2} alt="Farming chemicals" className="service-icon" />
              <h3 className="service-title">Selling Farming Chemicals</h3>
              <p className="service-description">
                We provide farming chemicals like pesticides and insecticides for farmers.
              </p>
            </div>
            <div className="service-item">
              <img src={sell3} alt="Renting machinery" className="service-icon" />
              <h3 className="service-title">Selling and Renting Machineries</h3>
              <p className="service-description">
                We sell as well as rent machines such as tractors for farmers.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
