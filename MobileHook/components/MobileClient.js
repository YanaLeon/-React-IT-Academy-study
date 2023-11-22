import React from 'react';

import './MobileClient.css';
import {companyEvents} from './events';

const MobileClient = ({id, info}) => {

  function deleteClient () {
    companyEvents.emit("EClentDelete", id)
  };

  function edit () {
    companyEvents.emit("EClentEdit", id)
  };

    console.log("MobileClient id="+id+" render");
    
    return (
    <tr>
      <td className='MobileClient'>{info.fam}</td>
      <td className='MobileClient'>{info.im}</td>
      <td className='MobileClient'>{info.otch}</td>
      <td className='MobileClient'>{info.balance}</td>
      <td className={info.status?"active":"blocked"}>{info.status?"active":"blocked"}</td>
      <td className='MobileClient'><input type='button' value={info.edit} onClick={() => (edit())}/></td>
      <td className='MobileClient'><input type='button' value={info.delete} onClick={() => (deleteClient())}/></td>
    </tr>
    );

}

export default React.memo(MobileClient);