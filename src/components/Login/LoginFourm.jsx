import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API/api"; // Import API file
import "../../css/LoginCss/loginFourm.css";
import img_i1 from "../../images/login_farmer.png"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginFourm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            setError("Please enter both email and password.");
            setLoading(false);
            return;
        }

        try {
            const response = await API.loginUser({ email, password });

            if (response.status === 200) {
                setError("");

                // ✅ Store user data in localStorage, including userId
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("isAdmin", response.data.isAdmin);

                // Redirect based on admin privileges
                if (response.data.isAdmin) {
                    navigate("/ad_dash"); 
                } else {
                    navigate("/"); 
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || "Login failed. Please check your credentials.");
        }

        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Welcome Back <span role="img" aria-label="wave">👋</span></h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <label className="lbl">Email</label>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="lbl">Password</label>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEye/> : <FaEyeSlash/>}
                        </button>
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form> 
                <p className="signup-text">
                    Don’t you have an account? <a href="/Register">Sign up</a>
                </p>
            </div>
            <div className="illustration">
                <img src={img_i1} alt="Farmer illustration" />
            </div>
        </div>
    );
};

export default LoginFourm;
