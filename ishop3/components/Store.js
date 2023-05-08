import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './Store.css';

import Product from './Product';

class Store extends React.Component {
  static propTypes = {
    store: PropTypes.arrayOf(PropTypes.object).isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    products: this.props.products,
    deleteProduct: null,
    colorProduct: null
  };

  productDelete = (code) => {
    var answer = confirm ('Хотите удалить товар? Если да нажмите "ОК", если нет нажмите "Отмена"');
    if (answer) {
      this.setState( {deleteProduct: code} );
      this.setState( {products: this.state.products.filter((element) => {
          if (element.code !== code) {
              return element;
          }
      })} );
    }
  };

  colorProduct = (code) => {
    this.setState( {colorProduct: code} );
  }; 

  render () {
    let storeCode = this.props.store.map(element => {
      return DOM.tr({key: element.id},
          DOM.th({className:'Store'}, element.name),
          DOM.th({className:'Store'}, element.cost),
          DOM.th({className:'Store'}, element.url),
          DOM.th({className:'Store'}, element.quantity),
          DOM.th({className:'Store'}, element.control)
          )
        });

        let productCode = this.state.products.map(element => {
          return React.createElement(Product, 
              {key: element.code,
              name: element.name, 
              cost: element.cost,
              url: element.url, 
              quantity: element.quantity,
              control: element.control,
              code: element.code,
              cbProductDelete: this.productDelete,
              cbColorProduct: this.colorProduct,
              colorProduct: this.state.colorProduct})
          });
          
          return DOM.tbody( {className:'Store'}, storeCode, productCode);
  }
}

export default Store;