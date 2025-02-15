import React from 'react';
import Body from "./crud1";
import Sidebar from '../Common/adminbar';
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import '../../css/CrudCss/crud1Final.css';

function CRUD() {
  return (
    <div className="crd_1">
      <p className='filler_cr1'>a</p>
      <Sidebar />
      <div className="body_crud"> {/* Apply correct class to fix layout */}
        <Body />
      </div>
    </div>
  );
}

export default CRUD;
