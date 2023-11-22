import React, { useState, useRef } from 'react';

import "./ToolsBar.css";

export default ({sort, filter, cbSortArray, cbFilterArray, cbResetFilter}) => {


  return (
    <div>
      <input type='checkbox' checked = {sort} onChange={(eo) => cbSortArray(eo.target.checked)}/>
      <input type='text' value = {filter} onChange={(eo) => cbFilterArray(eo.target.value)}/>
      <input type='button' value={"сброс"} onClick={()=> cbResetFilter()}/>
    </div>
  );
};
