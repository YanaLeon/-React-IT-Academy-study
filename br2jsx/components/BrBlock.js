import React, { Fragment } from 'react';
import PropTypes, { element } from 'prop-types';

class BrBlock extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
  };

 render() {
   let reg = /<br\W*?\>/g;
   let array = this.props.text.split(reg);
   let br = <br/>;
   let result = [];
   for (let element of array) {
      result.push(element);
      result.push(br); 
   }
   return (<div>{result}</div>);
 }
}

export default BrBlock;
