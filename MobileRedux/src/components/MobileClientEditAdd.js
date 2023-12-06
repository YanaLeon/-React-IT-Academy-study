import React, { useRef } from 'react';

import './MobileClient.css';

const MobileClientEditAdd = ({id, info, add, cbChange, cbCancel, cbAddClient}) => {

  const newFam = useRef(null);
  const newIm = useRef(null);
  const newOtch = useRef(null);
  const newBalance = useRef(null);

  function change () {
    cbChange(id, newFam.current.value, newIm.current.value,
      newOtch.current.value, newBalance.current.value)
  };

  function addClient () {
    cbAddClient(newFam.current.value, newIm.current.value,
      newOtch.current.value, newBalance.current.value)
  };

  function cancel () {
    cbCancel(false)
  };

console.log("MobileClientEditAdd id="+id+" render");
    
  return (
    add ? <tr>
      <td><input type = "text" defaultValue = "" ref={newFam}/></td>
      <td><input type = "text" defaultValue = "" ref={newIm}/></td>
      <td><input type = "text" defaultValue = "" ref={newOtch}/></td>
      <td><input type = "text" defaultValue = "" ref={newBalance}/></td>
      <td>{""}</td>
      <td><input type='button' value="Добавить" onClick={addClient}/></td>
      <td><input type='button' value="Отменить" onClick={cancel}/></td>
    </tr> :
    <tr>
    <td><input type = "text" defaultValue = {info.fam} ref={newFam}/></td>
    <td><input type = "text" defaultValue = {info.im} ref={newIm}/></td>
    <td><input type = "text" defaultValue = {info.otch} ref={newOtch}/></td>
    <td><input type = "text" defaultValue = {info.balance} ref={newBalance}/></td>
    <td className={info.balance>0?"active":"blocked"}>{info.balance>0?"active":"blocked"}</td>
    <td><input type='button' value="Сохранить" onClick={change}/></td>
    <td><input type='button' value="Отменить" onClick={cancel}/></td>
  </tr>
    );

}

export default React.memo(MobileClientEditAdd);