import React from 'react';
import Fourm from "./LoginFourm";
import Footer from '../Common/Footer';
import '../../css/LoginCss/loginPage.css';

function Login() {
  return (
    <div className="Login">
      <Fourm/>
      <Footer/>
      
    </div>
  );
}

export default Login;