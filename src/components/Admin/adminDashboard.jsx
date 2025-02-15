import React from 'react';
import Sidebar from '../Common/adminbar';
import Body from "./adminDashboardBody";
import '../../css/AdminCss/adminDashboard.css';


function AdminDash() {
  return (
    <div className="AdminLogin">
      <p className='filler_dbb' >a</p>
      <Sidebar/>
      <Body/>
      
    </div>
  );
}

export default AdminDash;