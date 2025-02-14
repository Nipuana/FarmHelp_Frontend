import React from 'react';
import Body from "./crud1";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import '../../css/CrudCss/crudFinal.css';

function CRUD() {
  return (
    <div className="crd_1">
      <p className='filler_crd' >a</p>
           {/* Sidebar */}
                  {/* <aside className="sidebar">
                    <button className="back-btn">
                      <FaHome /> ←-Pannel
                    </button>
                    <nav className="nav-links">
                      <ul>
                        <li>Users CRUD</li>
                        <li>Products CRUD</li>
                        <li>Reviews CRUD</li>
                        <li>Orders CRUD</li>
                        <li>Categories CRUD</li>
                      </ul>
                    </nav>
                    <button className="logout-btn">
                      <FaSignOutAlt /> Logout Admin
                    </button>
                  </aside> */}
      <Body/>
      
      
    </div>
  );
}

export default CRUD;