import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API/api"; // Import API file
import "../../css/RegisterCss/RegisterFourm.css";
import img_r1 from "../../images/login_farmer.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterFourm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!username || !email || password.length < 8) {
            setError("All fields are required. Password must be at least 8 characters.");
            setLoading(false);
            return;
        }

        try {
            const response = await API.registerUser({ username, email, password });

            if (response.status === 201) {
                setError("");
                localStorage.setItem("token", response.data.token);
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="register_frm-container">
            <div className="illustration">
                <img src={img_r1} alt="Illustration" />
            </div>
            <div className="register_frm-box">
                <h1>Get Started Now 🌱</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleRegister}>
                    <label className="lbl">Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label className="lbl">Email</label>
                    <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="lbl">Password</label>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="At least 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEye/> : <FaEyeSlash />}
                        </button>
                    </div>
                    <button type="submit" className="register_frm-btn" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <div className="alternate-register_frm">
                    <p>Or</p>
                    <button className="google-btn">Sign up with Google</button>
                </div>
                <p className="footer-text">
                    Already have an account? <a href="/login">Log in</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterFourm;
