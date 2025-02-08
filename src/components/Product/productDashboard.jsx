import React from 'react';
import Listing from "./productListing.jsx";
import Footer from '../Common/Footer';
import '../../css/ProductCss/productDashboard.css';

function AdminLogin() {
  return (
    <div className="AdminLogin">
      <p className='fillerP' >a</p>
      <Listing/>
      <Footer/>
      
    </div>
  );
}

export default AdminLogin;