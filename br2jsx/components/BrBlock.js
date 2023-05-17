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
   array.forEach((element, index) => {
    if(index < array.length - 1) {
      result.push(<Fragment key={index}>{element}{br}</Fragment>)
    } else {
      result.push(<Fragment key={index}>{element}</Fragment>)
    }
   });
   return result;
 }
}

export default BrBlock;
