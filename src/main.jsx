import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Landing/Header.jsx";
import Sidebar from "./components/Common/adminbar.jsx";
import "./index.css";
import Home from "./components/Home/homePage.jsx";
import Landing from "./components/Landing/landingPage.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import CRUD_User from "./components/CRUD-User/crudUserFinal.jsx";
import CRUD_Category from "./components/CRUD-Category/crudCategoryFinal.jsx";
import AdminDash from './components/Admin/adminDashboard.jsx';
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

const Layout = ({ children }) => {
    const location = useLocation();
    const adminRoutes = ["/ad_dash", "/CRUD1", "/CRUD2"];
    const isAdminPage = adminRoutes.includes(location.pathname);

    return (
        <>
            <HeaderWrapper />
            {isAdminPage && <Sidebar />} 
            {children}
        </>
    );
};

// General Protected Route (for authenticated users)
const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/Landing" replace />;
};

// Admin Protected Route (Only for Admin Users)
const AdminRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!token) {
        return <Navigate to="/Landing" replace />;
    }
    
    return isAdmin ? element : <Navigate to="*" replace />;
};

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <Layout>
                <Routes>
                    {/* General Routes */}
                    <Route path="/Landing" element={<Landing />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    
                    {/* Protected Routes */}
                    <Route path="*" element={<ProtectedRoute element={<NotFound />} />} />
                    <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                    <Route path="/product" element={<ProtectedRoute element={<Product />} />} />
                    <Route path="/about-us" element={<ProtectedRoute element={<Abt_US />} />} />
                    <Route path="/faqs" element={<ProtectedRoute element={<FAQ />} />} />      
                    
                    {/* Admin Protected Routes */}
                    <Route path="/CRUD1" element={<AdminRoute element={<CRUD_User />} />} />
                    <Route path="/CRUD2" element={<AdminRoute element={<CRUD_Category />} />} />
                    <Route path="/ad_dash" element={<AdminRoute element={<AdminDash />} />} />
                </Routes>
            </Layout>
        </Router>
    </StrictMode>
);
