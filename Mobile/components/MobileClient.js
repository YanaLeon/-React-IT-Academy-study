import React from 'react';

import './MobileClient.css';
import {companyEvents} from './events';

class MobileClient extends React.PureComponent {

  state = {
    info: this.props.info
  };

  delete = () => {
    companyEvents.emit("EClentDelete", this.props.id)
  };

  edit = () => {
    companyEvents.emit("EClentEdit", this.props.id)
  };

  render() {

    console.log("MobileClient id="+this.props.id+" render");
    
    return (
    <tr>
      <td className='MobileClient'>{this.state.info.fam}</td>
      <td className='MobileClient'>{this.state.info.im}</td>
      <td className='MobileClient'>{this.state.info.otch}</td>
      <td className='MobileClient'>{this.state.info.balance}</td>
      <td className={this.state.info.status?"active":"blocked"}>{this.state.info.status?"active":"blocked"}</td>
      <td className='MobileClient'><input type='button' value={this.state.info.edit} onClick={this.edit}/></td>
      <td className='MobileClient'><input type='button' value={this.state.info.delete} onClick={this.delete}/></td>
    </tr>
    );

  }

}

export default MobileClient;
