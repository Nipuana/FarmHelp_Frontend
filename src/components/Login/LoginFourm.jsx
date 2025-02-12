import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API/api"; // Import API file
import "../../css/LoginCss/loginFourm.css";
import img_i1 from "../../images/login_farmer.png"; 

const LoginFourm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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
                // alert("Login Successful! Redirecting to Dashboard...");

                // Store token in local storage
                localStorage.setItem("token", response.data.token);

                // Redirect to dashboard
                navigate("/");
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
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
                <div className="other-options">
                    <button className="google-btn">Sign in with Google</button>
                </div>
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
