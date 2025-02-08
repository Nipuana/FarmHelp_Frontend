import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/RegisterCss/RegisterFourm.css';
import img_r1 from '../../images/login_farmer.png';

const RegisterFourm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (username && password.length >= 8) {
            setError("");
            navigate("/dashboard");
        } else {
            setError("Invalid username or password");
        }
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
                    <label className="lbl">Email</label>
                    <input
                        type="text"
                        placeholder="example@gmail.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label className="lbl">Password</label>
                    <input
                        type="password"
                        placeholder="at least 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="register_frm-btn">Register</button>
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
