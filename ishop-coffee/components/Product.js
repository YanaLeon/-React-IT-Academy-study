import React from 'react';

import './Product.css';

class Product extends React.Component {

    render () {
        return (
        <tr>
            <td className='Product'>{this.props.name}</td>
            <td className='Product'><img src={this.props.foto} width={100} height={100}/></td>
            <td className='Product'>{this.props.cost}</td>
            <td className='Product'><a href={this.props.url}>{this.props.url}</a></td>
            <td className='Product'>{this.props.country}</td>
        </tr>)
    }
}

export default Product;