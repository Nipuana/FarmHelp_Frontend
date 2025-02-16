import React from 'react';
import Body from "./crudUser";
import '../../css/CrudUserCss/crudUserFinal.css';

function CRUD() {
  return (
    <div className="crd_1">
      <p className='filler_cr1'>a</p>
      <div className="body_crud"> {/* Apply correct class to fix layout */}
        <Body />
      </div>
    </div>
  );
}

export default CRUD;
