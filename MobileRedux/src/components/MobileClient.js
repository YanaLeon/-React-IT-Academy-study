import React from 'react';

import './MobileClient.css';

const MobileClient = ({id, info, cbDelete, cbEdit}) => {

  function deleteClient () {
    cbDelete(id)
  };

  function edit () {
    cbEdit(id)
  };

  console.log("MobileClient id="+id+" render");
    
    return (
    <tr>
      <td className='MobileClient'>{info.fam}</td>
      <td className='MobileClient'>{info.im}</td>
      <td className='MobileClient'>{info.otch}</td>
      <td className='MobileClient'>{info.balance}</td>
      <td className={info.balance>0?"active":"blocked"}>{info.balance>0?"active":"blocked"}</td>
      <td className='MobileClient'><input type='button' value={"Редактировать"} onClick={edit}/></td>
      <td className='MobileClient'><input type='button' value={"Удалить"} onClick={deleteClient}/></td>
    </tr>
    );

}

export default React.memo(MobileClient);