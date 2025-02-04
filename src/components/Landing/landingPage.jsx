import React from 'react';
import Header from './Header';
import Body from "./Body";
import Footer from '../Common/Footer';
import '../../css/LandingCss/landingPage.css';

function App() {
  return (
    <div className="App">
      <Header />
      <p className='filler' >a</p>
      <Body/>
      <Footer/>
      
    </div>
  );
}

export default App;