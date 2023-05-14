import React, { Fragment } from 'react';
import PropTypes, { element } from 'prop-types';

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

  changeName = (eo) => {
    if (eo.target.value === '') {
      this.setState({errorName: true, name: eo.target.value})
    } else {
      this.setState({name: eo.target.value, errorName: false, editStart: true});
    }
  };

  changeCost = (eo) => {
    if (eo.target.value === '') {
      this.setState({errorCost: true, cost: eo.target.value})
    } else {
      this.setState({cost: eo.target.value, errorCost: false, editStart: true})
    }
  };

  changeURL = (eo) => {
    if (eo.target.value === '') {
      this.setState({errorURL: true, url: eo.target.value})
    } else {
      this.setState({url: eo.target.value, errorURL: false, editStart: true})
    }
  };

  changeQuantity = (eo) => {
    if (eo.target.value === '') {
      this.setState({errorQuantity: true, quantity: eo.target.value})
    } else {
      this.setState({quantity: eo.target.value, errorQuantity: false, editStart: true})
    }
  };

  save = () => {
    this.state.products.map(element => {
      if (this.state.edit === element.code) {
          element.name = this.state.name;
          element.cost = this.state.cost;
          element.url = this.state.url;
          element.quantity = this.state.quantity;
      }
    })
    this.setState({name: '', cost: '', url: '', quantity: '', edit: null, editStart: false})
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
    this.setState({add: true, name: '', cost: '', url: '', quantity: '', edit: null, colorProduct: null, 
      errorName: true, errorCost: true, errorURL: true, errorQuantity: true})
  };

  addButton = () => {
    this.props.products.push({name: this.state.name, cost: this.state.cost, url: this.state.url,
    quantity: this.state.quantity, controlEd: "Edit", control: "Delete", code: Math.random()});
    this.setState({products: this.props.products, add: false, editStart: false, 
      name: '', cost: '', url: '', quantity: ''})
  };

  addCancel = () => {
    this.setState({add: false, name: '', cost: '', url: '', quantity: '',
    errorName: false, errorCost: false, errorURL: false, errorQuantity: false, editStart: false})
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
      add={this.state.add}/>
    });

    let add = <tr>
                <td>
                  <input type = 'button' value = 'New product' onClick={this.add} disabled={this.state.editStart || this.state.add}/>
                </td>
              </tr>;

    let info = this.state.products.map(element => {
      if(this.state.colorProduct === element.code) {
        return <Fragment key={element.code}>
                   <tr className='Info'><td colSpan='2'>{element.name}</td></tr>
                   <tr><td>{element.name}</td></tr>
                   <tr><td>{'Price:'}{element.cost}</td></tr>
              </Fragment>        
      }
    });

    let edit = this.state.products.map(element => {
      if(this.state.edit === element.code) {
        return <Fragment key={element.code}>
                    <tr className='Info'><td colSpan='3'>Edit existing Product</td></tr>
                    <tr>
                      <td colSpan='2'>{'Name:'}</td>
                      <td><input type='text' value={this.state.name} onChange={this.changeName}/></td>
                      <td className='Error' colSpan='2'>{(this.state.errorName)? 'Please, fill the filed':null}</td>
                    </tr>
                    <tr>
                      <td colSpan='2'>{'Price:'}</td>
                      <td><input type='text' value={this.state.cost} onChange={this.changeCost}/></td>
                      <td className='Error' colSpan='2'>{(this.state.errorCost)? 'Please, fill the filed':null}</td>
                    </tr>
                    <tr>
                      <td colSpan='2'>{'URL:'}</td>
                      <td><input type='text' value={this.state.url} onChange={this.changeURL}/></td>
                      <td className='Error' colSpan='2'>{(this.state.errorURL)? 'Please, fill the filed':null}</td>
                    </tr>
                    <tr>
                      <td colSpan='2'>{'Quantity:'}</td>
                      <td><input type='text' value={this.state.quantity} onChange={this.changeQuantity}/></td>
                      <td className='Error' colSpan='2'>{(this.state.errorQuantity)? 'Please, fill the filed':null}</td>
                    </tr>
                    <tr>
                      <td><input type="button" value={'Save'} onClick={this.save} disabled={(!this.state.editStart) || (this.state.errorName || this.state.errorCost || this.state.errorURL || this.state.errorQuantity)}/>
                      <input type='button' value={'Cancel'} onClick={this.cancel}/></td>
                    </tr>
               </Fragment>
      }
    });

    let addProduct = <Fragment>
                    <tr className='Info'><td colSpan='2'>Add new product</td></tr>
                    <tr>
                      <td colSpan='2'>{'Name:'}</td>
                      <td><input type='text' value={this.state.name} onChange={this.changeName}/></td>
                      <td className='Error' colSpan='2'>{(this.state.errorName)? 'Please, fill the filed':null}</td>
                    </tr>
                    <tr>
                      <td colSpan='2'>{'Price:'}</td>
                      <td><input type='text' value={this.state.cost} onChange={this.changeCost}/></td>
                      <td className='Error' colSpan='2'>{(this.state.errorCost)? 'Please, fill the filed':null}</td>
                    </tr>
                    <tr>
                      <td colSpan='2'>{'URL:'}</td>
                      <td><input type='text' value={this.state.url} onChange={this.changeURL}/></td>
                      <td className='Error' colSpan='2'>{(this.state.errorURL)? 'Please, fill the filed':null}</td>
                    </tr>
                    <tr>
                      <td colSpan='2'>{'Quantity:'}</td>
                      <td><input type='text' value={this.state.quantity} onChange={this.changeQuantity}/></td>
                      <td className='Error' colSpan='2'>{(this.state.errorQuantity)? 'Please, fill the filed':null}</td>
                    </tr>
                    <tr>
                      <td><input type="button" value={'Add'} onClick={this.addButton} disabled={this.state.errorName || this.state.errorCost || this.state.errorURL || this.state.errorQuantity}/>
                      <input type='button' value={'Cancel'} onClick={this.addCancel}/></td>
                    </tr>
                  </Fragment>;
    return (
    <tbody className='Store'>{storeCode}{productCode}{add}
    {((this.state.edit && (!this.state.add)) && edit)} 
    {((!this.state.edit) && (!this.state.add) && info)}
    {(this.state.add) && addProduct}</tbody>
    )
   
  }
}

export default Store;