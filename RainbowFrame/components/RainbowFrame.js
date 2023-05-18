import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class RainbowFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.array.isRequired,
  };
  

  render() {
    let arrayFrame = this.props.colors.reduce((acc, element) => {
      return (
        <Fragment>
          <div style={{borderStyle: 'solid', borderWidth: '5px', borderColor: element, margin: '5px'}}>
            {acc}
          </div>
        </Fragment>
      );
    }, this.props.children)
    return arrayFrame;
  }

}

export default RainbowFrame;
