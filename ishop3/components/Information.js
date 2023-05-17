import React from 'react';
import PropTypes from 'prop-types';

import './Information.css';

class Information extends React.Component {
    static propTypes = {
        products: PropTypes.array.isRequired,
        colorProduct: PropTypes.any,
    };

    render () {
        let info = this.props.products.map(element => {
            if(this.props.colorProduct === element.code) {
              return <tbody key={element.code}>
                          <tr className='Info'><td colSpan='2'>{element.name}</td></tr>
                          <tr><td>{element.name}</td></tr>
                          <tr><td>{'Price:'}{element.cost}</td></tr>
                    </tbody>
            }
        });
       
        return info
    }
}

export default Information;