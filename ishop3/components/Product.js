import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './Product.css';

class Product extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        control: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
        cbProductDelete: PropTypes.func.isRequired,
        cbColorProduct: PropTypes.func.isRequired,
        colorProduct: PropTypes.any
    };

    deleteProduct = (eo) => {
        eo.stopPropagation();
        this.props.cbProductDelete(this.props.code);
        
    };

    colorProduct = () => {
        this.props.cbColorProduct(this.props.code);
    };

    render () {
        return DOM.tr({onClick: this.colorProduct, style:{backgroundColor:(this.props.colorProduct === this.props.code)?'orange':'white'}},
            DOM.td({className: 'Product'}, this.props.name),
            DOM.td({className: 'Product'}, this.props.cost),
            DOM.td({className: 'Product'}, this.props.url),
            DOM.td({className: 'Product'}, this.props.quantity),
            DOM.td(null, 
                DOM.input ({type:'button', value: this.props.control, className: 'Product', onClick: this.deleteProduct})
            ),
        )
    }
}

export default Product;