import React from 'react';

import {companyEvents} from './events';
import './MobileClient.css';

class MobileClientEditAdd extends React.PureComponent {

  state = {
    info: this.props.info
  };

  newFam = React.createRef();
  newIm = React.createRef();
  newOtch = React.createRef();
  newBalance = React.createRef();

  change = (eo) => {
    console.log(this.props.id, this.newFam.current.value)
    companyEvents.emit("EClentSave", this.props.id, this.newFam.current.value, this.newIm.current.value,
    this.newOtch.current.value, this.newBalance.current.value)
  };

  addClient = () => {
    companyEvents.emit("EClentAdd", this.newFam.current.value, this.newIm.current.value,
    this.newOtch.current.value, this.newBalance.current.value)
  };

  cancel = () => {
    companyEvents.emit("EClentCancelAddClient", false)
  };

  render() {

    console.log("MobileClientEditAdd id="+this.props.id+" render");
    
    return (
    this.props.add ? <tr>
      <td><input type = "text" defaultValue = "" ref={this.newFam}/></td>
      <td><input type = "text" defaultValue = "" ref={this.newIm}/></td>
      <td><input type = "text" defaultValue = "" ref={this.newOtch}/></td>
      <td><input type = "text" defaultValue = "" ref={this.newBalance}/></td>
      <td>{""}</td>
      <td><input type='button' value="Добавить" onClick={this.addClient}/></td>
      <td><input type='button' value="Отменить" onClick={this.cancel}/></td>
    </tr> :
    <tr>
    <td><input type = "text" defaultValue = {this.state.info.fam} ref={this.newFam}/></td>
    <td><input type = "text" defaultValue = {this.state.info.im} ref={this.newIm}/></td>
    <td><input type = "text" defaultValue = {this.state.info.otch} ref={this.newOtch}/></td>
    <td><input type = "text" defaultValue = {this.state.info.balance} ref={this.newBalance}/></td>
    <td className={this.state.info.status?"active":"blocked"}>{this.state.info.status?"active":"blocked"}</td>
    <td><input type='button' value="Сохранить" onClick={this.change}/></td>
    <td><input type='button' value="Отменить" onClick={this.cancel}/></td>
  </tr>
    );

  }

}

export default MobileClientEditAdd;