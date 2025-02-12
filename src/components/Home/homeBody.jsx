import React from "react";
import "../../css/HomeCss/homeBody.css";
import farmingImage from "../../images/dash_tbg.png"; 
import illst_1 from '../../images/product_img.png'
import sell1 from '../../images/sell1.png';
import sell2 from '../../images/sell2.png';
import sell3 from '../../images/sell3.png';


function App() {
  return (
    <div className="container_h">
      {/* Hero Section */}
      <div className="hero_h">
        <img src={farmingImage} alt="Farming" className="hero-image_h" />
        <div className="hero-text_h">
          <h1>A place for all farming products</h1>
        </div>
      </div>

      {/* Services Section */}
      <section className="services-section_h">
        <h2 className="section-title_h">Our Services</h2>
        <div className="services-grid_h">
          <div className="service-item_h">
            <img src={sell1} alt="Farming tools" className="service-icon_h" />
            <h3 className="service-title_h">Selling Farming Tools</h3>
            <p className="service-description_h">
              We provide farming tools for farmers that fulfill all their needs.
            </p>
          </div>
          <div className="service-item_h">
            <img src={sell2} alt="Farming chemicals" className="service-icon_h" />
            <h3 className="service-title_h">Selling Farming Chemicals</h3>
            <p className="service-description_h">
              We provide farming chemicals like pesticides and insecticides for farmers.
            </p>
          </div>
          <div className="service-item_h">
            <img src={sell3} alt="Renting machinery" className="service-icon_h" />
            <h3 className="service-title_h">Selling and Renting Machineries</h3>
            <p className="service-description_h">
              We sell as well as rent machines such as tractors for farmers.
            </p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info_h">
        <div className="info-text_h">
          <h3>The unseen cost included with buying equipment from unauthorized sellers</h3>
          <p>
            Farmers can get scammed or buy sub-standard products if they don't check authenticity. Our platform
            ensures reliability and cost efficiency.
          </p>
          <button className="learn-more_h">Learn More</button>
        </div>
        <img src={illst_1} alt="Illustration" className="info-image_h" />
      </section>
    </div>
  );
}

export default App;
