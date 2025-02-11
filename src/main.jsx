import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Landing/Header.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Landing from './components/Landing/landingPage.jsx';
import NotFound from './components/NotFound/NotFound.jsx'; 
import AdminLogin from './components/Admin/adminLogin.jsx';
import Register from './components/Register/registerPage.jsx'
import Product from './components/Product/productDashboard.jsx';
import Login from './components/Login/loginPage.jsx';
import Abt_US from './components/AboutUs/AboutUs.jsx'
import FAQ from './components/faq/faq.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/AdminLogin101" element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} /> 
        <Route path="/Register" element={<Register />} />
        <Route path='/product' element={<Product/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/about-us' element={<Abt_US/>}/>
        <Route path='/faqs' element={<FAQ />}/>
      </Routes>
    </Router>
  </StrictMode>
);