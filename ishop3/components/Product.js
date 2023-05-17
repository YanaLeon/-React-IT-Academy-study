import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './Product.css';

class Product extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        cost: PropTypes.any.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.any.isRequired,
        control: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
        cbProductDelete: PropTypes.func.isRequired,
        cbColorProduct: PropTypes.func.isRequired,
        colorProduct: PropTypes.any,
        cbEditProduct: PropTypes.func.isRequired,
        editStart: PropTypes.bool.isRequired,
        edit: PropTypes.any,
        add: PropTypes.bool
    };

    deleteProduct = () => {
        this.props.cbProductDelete(this.props.code);
        
    };

    colorProduct = () => {
        if((!this.props.add) && (!this.props.editStart)) {
            this.props.cbColorProduct(this.props.code, null);
        }
    };

    editProduct = (eo) => {
        eo.stopPropagation();
        this.props.cbEditProduct(this.props.code, this.props.name, this.props.cost, this.props.url, this.props.quantity)
    };

    render () {
        return <tr onClick={this.colorProduct} style={{backgroundColor:((this.props.colorProduct === this.props.code))?'orange':'white'}}>
                  <td className='Product'>{this.props.name}</td>
                  <td className='Product'>{this.props.cost}</td>
                  <td className='Product'>{this.props.url}</td>
                  <td className='Product'>{this.props.quantity}</td>
                  <td>
                    {(this.props.editStart || this.props.add) ?
                    <Fragment><input type='button' value={this.props.controlEd} className='Product' onClick={this.editProduct} disabled/>
                    <input type='button' value={this.props.control} className='Product' onClick={this.deleteProduct} disabled/></Fragment>
                    :
                    <Fragment><input type='button' value={this.props.controlEd} className='Product' onClick={this.editProduct} />
                    <input type='button' value={this.props.control} className='Product' onClick={this.deleteProduct} /></Fragment>
                    }
                    
                  </td>
                </tr>
    }
}

export default Product;