import React, { Fragment } from 'react';


class DoubleButton extends React.Component {
  
  press = (eo) => {
    this.props.cbPressed(eo.target.value)
  };

  render() {
    
    return (
      <div style={{margin: "15px"}}>
        <input type="button" defaultValue={this.props.caption1} onClick={this.press}/>
        {this.props.children}
        <input type="button" defaultValue={this.props.caption2} onClick={this.press}/>
      </div>
    );
  }

}

export default DoubleButton;
