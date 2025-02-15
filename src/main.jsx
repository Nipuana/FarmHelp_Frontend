import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Landing/Header.jsx";
import "./index.css";
import Home from "./components/Home/homePage.jsx";
import Landing from "./components/Landing/landingPage.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import CRUD from "./components/CRUD-User/crudUserFinal.jsx";
import AdminDash from './components/Admin/adminDashboard.jsx'
import Register from "./components/Register/registerPage.jsx";
import Product from "./components/Product/productDashboard.jsx";
import Login from "./components/Login/loginPage.jsx";
import Abt_US from "./components/AboutUs/AboutUs.jsx";
import FAQ from "./components/faq/faq.jsx";


const HeaderWrapper = () => {
    const location = useLocation(); 
    const [key, setKey] = useState(0); 

    useEffect(() => {
        setKey((prevKey) => prevKey + 1); 
    }, [location]);

    return <Header key={key} />; 
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/Landing" replace />;
};

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <HeaderWrapper /> 
            <Routes>
                <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/Landing" element={<Landing />} />
                <Route path="/CRUD-User" element={<ProtectedRoute element={<CRUD />} />} />
                <Route path="/ad_dash" element={<ProtectedRoute element={<AdminDash />} />} />
                <Route path="*" element={<ProtectedRoute element={<NotFound />} />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/product" element={<ProtectedRoute element={<Product />} />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/about-us" element={<ProtectedRoute element={<Abt_US />} />} />
                <Route path="/faqs" element={<ProtectedRoute element={<FAQ />} />} />
            </Routes>
        </Router>
    </StrictMode>
);
