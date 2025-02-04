import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Landing/Header.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Landing from './components/Landing/landingPage.jsx';
// import About from './components/About/About.jsx';
// import Contact from './components/Contact/Contact.jsx';
import NotFound from './components/NotFound/NotFound.jsx'; // 404 page

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  </StrictMode>
);