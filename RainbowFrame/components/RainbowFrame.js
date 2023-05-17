import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class RainbowFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.array.isRequired,
  };
  

  render() {
    let arrayFrame = this.props.colors.reduce((acc, element, index) => {
      return (
        <div style={{borderStyle: 'solid', borderWidth: '5px', borderColor: element, margin: '5px'}}>
          {index === 0 ? this.props.children : acc}
        </div>
      );
    }, -1)
    return (
      <div>
        {arrayFrame}
      </div>
    );
  }

}

export default RainbowFrame;
