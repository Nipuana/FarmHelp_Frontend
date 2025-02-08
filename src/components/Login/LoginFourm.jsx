import React from "react";
import '../../css/LoginCss/loginFourm.css'; 
import img_i1 from '../../images/login_farmer.png'; 

const loginFourm = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Welcome Back <span role="img" aria-label="wave">👋</span></h1>
                <form>
                    <label className="lbl">Email</label>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        required
                    />
                    <label className="lbl">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                    <button type="submit" className="login-btn">Sign In</button>
                </form>
                <div className="other-options">
                    <button className="google-btn">Sign in with Google</button>
                </div>
                <p className="signup-text">Don’t you have an account? <a href="/signup">Sign up</a></p>
            </div>
            <div className="illustration">
                <img src={img_i1} alt="Farmer illustration" />
            </div>
        </div>
    );
};

export default loginFourm;
