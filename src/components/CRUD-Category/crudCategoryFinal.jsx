import React from 'react';
import Body from "./crudCategory";
import '../../css/CrudCategoryCss/crudCategoryFinal.css';

function CRUD2() {
  return (
    <div className="crd_1">
      <div className="body_crud"> {/* Apply correct class to fix layout */}
        <Body />
      </div>
    </div>
  );
}

export default CRUD2;
