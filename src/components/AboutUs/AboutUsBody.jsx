import React from "react";
import '../../css/AboutUsCss/AboutUsBody.css'

export default function AboutUs() {
  return (
    <div className="main-container">
      {/* Header Section */}
      <header className="header-section" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
        <div className="overlay"></div>
        <div className="header-content">
          <h1 className="header-title">About Us</h1>
          <p className="header-description">
            From farming materials to farming chemicals like insecticides, pesticides, and machines, we have everything covered for farmers.
          </p>
          <button className="header-button">See More</button>
        </div>
      </header>

      {/* Main Section */}
      <main className="main-section">
        <section className="intro-section">
          <h2 className="section-title">Providing quality goods for farmers</h2>
          <p className="section-description">
            We maintain the quality of goods for all the products that we provide. If the rented products get damaged, we expect you to compensate us thoroughly.
          </p>
        </section>

        {/* Products Section */}
        <section className="products-section">
          <div className="product-content">
            <h3 className="product-title">Providing goods for farmers all across Nepal</h3>
            <p className="product-description">
              We maintain the quality of goods for all the products that we provide. If the rented products get damaged, we expect you to compensate us thoroughly.
            </p>
            <button className="product-button">Go To Products</button>
          </div>
          <div className="product-image-container">
            <img
              src="/path/to/tractor-image.jpg"
              alt="Tractor in the field"
              className="product-image"
            />
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {/* Service 1 */}
            <div className="service-item">
              <img
                src="/path/to/service1-icon.png"
                alt="Farming tools"
                className="service-icon"
              />
              <h3 className="service-title">Selling Farming Tools</h3>
              <p className="service-description">
                Students practice at their own pace, first filling in gaps in their understanding and then accelerating their learning.
              </p>
            </div>
            {/* Service 2 */}
            <div className="service-item">
              <img
                src="/path/to/service2-icon.png"
                alt="Farming chemicals"
                className="service-icon"
              />
              <h3 className="service-title">Selling Farming Chemicals</h3>
              <p className="service-description">
                Created by experts, library of trusted practices and lessons covers math, science, and more. Always here for learners and teachers.
              </p>
            </div>
            {/* Service 3 */}
            <div className="service-item">
              <img
                src="/path/to/service3-icon.png"
                alt="Renting machinery"
                className="service-icon"
              />
              <h3 className="service-title">Selling and Renting Machineries</h3>
              <p className="service-description">
                Teachers can identify gaps in their students' understanding, tailor instruction, and meet the needs of every student.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
