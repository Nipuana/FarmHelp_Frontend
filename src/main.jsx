import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Landing/Header.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Landing from './components/Landing/landingPage.jsx';
import NotFound from './components/NotFound/NotFound.jsx'; 
import AdminLogin from './components/Admin/adminLogin.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/AdminLogin101" element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  </StrictMode>
);