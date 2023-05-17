import React, { Fragment } from 'react';
import PropTypes, { element } from 'prop-types';

import './Store.css';

import Product from './Product';
import Information from './Information';
import AddEdite from './AddEdite';

class Store extends React.Component {
  static propTypes = {
    store: PropTypes.arrayOf(PropTypes.object).isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    products: this.props.products,
    deleteProduct: null,
    colorProduct: null,
    edit: null,
    editStart: false,
    name: '',
    cost: '',
    url: '',
    quantity: '',
    errorName: false,
    errorCost: false,
    errorURL: false,
    errorQuantity: false,
    add: false
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

  colorProduct = (code, edit) => {
    this.setState( {colorProduct: code, edit: edit} );
  }; 

  edit = (code, name, cost, url, quantity) => {
    this.setState ({edit: code, colorProduct: code, name: name, cost: cost, url: url, quantity: quantity})
  };

  changeName = (start) => {
    this.setState({editStart: start});
  };

  changeCost = (start) => {
    this.setState({editStart: start});
  };

  changeURL = (start) => {
    this.setState({editStart: start});
  };

  changeQuantity = (start) => {
    this.setState({editStart: start});
  };

  save = (name, cost, url, quantity) => {
    this.state.products.map(element => {
      if (this.state.edit === element.code) {
          element.name = name;
          element.cost = cost;
          element.url = url;
          element.quantity = quantity;
      }
    })
    this.setState({edit: null, editStart: false})
  };

  cancel = () => {
    this.state.products.map(element => {
      if(this.state.edit === element.code) {
        this.setState({name: element.name, cost: element.cost, url: element.url, quantity: element.quantity,
          errorName: false, errorCost: false, errorURL: false, errorQuantity: false})
      }
    })
  };

  add = () => {
    this.setState({add: true, name: '', cost: '', url: '', quantity: '', edit: null, colorProduct: null})
  };

  addButton = (name, cost, url, quantity, editPr, deletePr) => {
    this.props.products.push({name: name, cost: cost, url: url,
    quantity: quantity, controlEd: editPr, control: deletePr, code: Math.random()});
    this.setState({products: this.props.products, add: false, editStart: false, 
      name: '', cost: '', url: '', quantity: ''})
  };

  addCancel = (cancel) => {
    if(cancel) {
      this.setState({add: false, name: '', cost: '', url: '', quantity: '', editStart: false})
    }
  };

  render () {
    let storeCode = this.props.store.map(element => {
      return <tr key={element.id}>
              <td className='Store'>{element.name}</td>
              <td className='Store'>{element.cost}</td>
              <td className='Store'>{element.url}</td>
              <td className='Store'>{element.quantity}</td>
              <td className='Store'>{element.control}</td>
          </tr>});

    let productCode = this.state.products.map(element => {
      return <Product key={element.code} 
                      name={element.name} 
                      cost={element.cost} 
                      url={element.url} 
                      quantity={element.quantity} 
                      controlEd={element.controlEd} 
                      control={element.control} 
                      code={element.code} 
                      cbProductDelete={this.productDelete} 
                      cbColorProduct={this.colorProduct} 
                      colorProduct={this.state.colorProduct} 
                      cbEditProduct={this.edit}
                      editStart={this.state.editStart}
                      edit={this.state.edit}
                      add={this.state.add}></Product>
      });

    let add = <tr>
                <td>
                  <input type = 'button' value = 'New product' onClick={this.add} disabled={this.state.editStart || this.state.add}/>
                </td>
              </tr>;

    let information = <Information products={this.state.products}
                                   colorProduct={this.state.colorProduct}>
                      </Information>;

    let editProduct = <AddEdite products={this.state.products}
                                edit={this.state.edit}
                                editStart={this.state.editStart}
                                name={this.state.name}
                                cost={this.state.cost}
                                url={this.state.url}
                                quantity={this.state.quantity}
                                cbChangeName={this.changeName}
                                cbChangeCost={this.changeCost}
                                cbChangeURL={this.changeURL}
                                cbChangeQuantity={this.changeQuantity}
                                cbSave={this.save}
                                add={this.state.add}
                                cbAddButton={this.addButton}
                                cbAddCancel={this.addCancel}></AddEdite>;
    return (
      <Fragment>
         <table>
          <tbody className='Store'>{storeCode}{productCode}{add}</tbody>
         </table>
          {((!this.state.edit) && (!this.state.add) &&  <table>{information}</table>)}
          {((this.state.edit || (this.state.add)) && <table>{editProduct}</table>)}
      </Fragment>
    )
   
  }
}

export default Store;