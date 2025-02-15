import React from 'react';
import Body from "./crudCategory";
import Sidebar from '../Common/adminbar';
import '../../css/CrudCategoryCss/crudCategoryFinal.css';

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
