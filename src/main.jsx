import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Landing from './components/Landing/landingPage.jsx';
import About from './components/About/About.jsx'; // Example of another page
import Contact from './components/Contact/Contact.jsx'; // Example of another page

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/contact" element={<Contact />} /> 
      </Routes>
    </Router>
  </StrictMode>
);