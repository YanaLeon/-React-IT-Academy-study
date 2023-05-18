import React from 'react';
import PropTypes from 'prop-types';

import './Information.css';

class Information extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        cost: PropTypes.any.isRequired
    };

    render () {
        let info = <tbody key={1}>
                      <tr className='Info'><td colSpan='2'>{this.props.name}</td></tr>
                      <tr><td>{this.props.name}</td></tr>
                      <tr><td>{'Price:'}{this.props.cost}</td></tr>
                   </tbody>
       
        return info
    }
}

export default Information;