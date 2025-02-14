import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import '../../css/AdminCss/AdminLoginFourm.css';
import img_i1 from '../../images/admin_login_img.png';

const AdminLogin = () => {
    const [username, setUsername] = useState(""); // State for username
    const [password, setPassword] = useState(""); // State for password
    const [error, setError] = useState(""); // State for error message
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent form submission

        // Validate username and password
        if (username === "@dmin" && password === "@dmin123") {
            setError(""); // Clear any previous error
            navigate("/ad_dash"); // Redirect to /Admin_Dashboard
        } else {
            setError("Invalid username or password"); // Set error message
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login To <br /> Access Admin Panel</h1>
                {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>} {/* Display error message */}
                <form onSubmit={handleLogin}>
                    <label className="lbl">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label className="lbl">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
            <div className="illustration">
                <img src={img_i1} alt="Illustration" />
            </div>
        </div>
    );
};

export default AdminLogin;