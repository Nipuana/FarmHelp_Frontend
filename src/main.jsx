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
import CRUD_Product from "./components/CRUD-Product/crudProductFinal.jsx";
import CRUD_Order from "./components/CRUD-Order/crudOrderFinal.jsx";
import CRUD_Review from "./components/CRUD-Review/crudReviewFinal.jsx";
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
    const adminRoutes = ["/ad_dash", "/CRUD1", "/CRUD2", "/CRUD3", "/CRUD4", "/CRUD5"];
    const isAdminPage = adminRoutes.includes(location.pathname);

    return (
        <>
            <HeaderWrapper />
            {isAdminPage && <Sidebar />} 
            {children}
        </>
    );
};

// **Role-Based Route Handling**
const RoleBasedRoute = ({ element, role }) => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!token) {
        return <Navigate to="/Landing" replace />;
    }

    if (role === "admin" && !isAdmin) {
        return <Navigate to="/" replace />; // Redirect normal users away from admin pages
    }

    if (role === "user" && isAdmin) {
        return <Navigate to="/ad_dash" replace />; // Redirect admins away from user pages
    }

    return element;
};

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <Layout>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/Landing" element={<Landing />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />

                    {/* User-Only Routes */}
                    <Route path="/" element={<RoleBasedRoute element={<Home />} role="user" />} />
                    <Route path="/product" element={<RoleBasedRoute element={<Product />} role="user" />} />
                    <Route path="/about-us" element={<RoleBasedRoute element={<Abt_US />} role="user" />} />
                    <Route path="/faqs" element={<RoleBasedRoute element={<FAQ />} role="user" />} />

                    {/* Admin-Only Routes */}
                    <Route path="/CRUD1" element={<RoleBasedRoute element={<CRUD_User />} role="admin" />} />
                    <Route path="/CRUD2" element={<RoleBasedRoute element={<CRUD_Category />} role="admin" />} />
                    <Route path="/CRUD3" element={<RoleBasedRoute element={<CRUD_Product />} role="admin" />} />
                    <Route path="/CRUD4" element={<RoleBasedRoute element={<CRUD_Order />} role="admin" />} />
                    <Route path="/CRUD5" element={<RoleBasedRoute element={<CRUD_Review />} role="admin" />} />
                    <Route path="/ad_dash" element={<RoleBasedRoute element={<AdminDash />} role="admin" />} />

                    {/* 404 Not Found */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </Router>
    </StrictMode>
);
