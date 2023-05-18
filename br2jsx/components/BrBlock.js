import React, { Fragment } from 'react';
import PropTypes, { element } from 'prop-types';

class BrBlock extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
  };

 render() {
   let reg = /<br\W*?\>/g;
   let array = this.props.text.split(reg);
   let result = [];
   array.forEach((element, index) => {
    if(index < array.length - 1) {
      result.push(element);
      result.push(<br key={index}/>);
    } else {
      result.push(element)
    }
   });
   return <div>{result}</div>;
 }
}

export default BrBlock;
