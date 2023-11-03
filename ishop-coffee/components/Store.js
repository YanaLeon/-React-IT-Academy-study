import React from 'react';

import './Store.css';

import Product from './Product';
import Information from './Information';
import AddEdit from './AddEdit'

class Store extends React.Component {

  state = {
    products:this.props.products,
    selectProductCode: null,
    name: "",
    cost: "",
    url: "",
    country: "",
    edit: null,
    editStart: false,
    add: false,
    stop: false
  };

  selectProduct = (code, edit, name, cost, country) => {
    this.setState({selectProductCode: code, name: name, cost: cost, country: country, edit: edit, stop: false});
  };

  deleteProduct = (code) => {
    let answer = confirm("Вы хотитет удалить товар? Если да, нажмите 'ОК'б если нет, нажмите 'Отмена' ");
    if(answer) {
      let newStore = this.state.products.filter(prod => prod.code!==code);
    this.setState({products: newStore, selectProductCode: null, edit: null});
    }
  };

  editProduct = (code, name, cost, url, country) => {
    this.setState({edit: code, selectProductCode: code, name: name, cost: cost, url: url, country: country});
  };

  change = (start) => {
    this.setState({editStart: start});
  };

  save = (change) => {
    let productsClone = this.state.products.slice();
    let elementEdit;
    this.state.products.forEach(element => {
      if(this.state.edit === element.code) {
        elementEdit = element;
      }
    });
    elementEdit = {...elementEdit, ...change};
    this.setState({edit: null, editStart: false, stop: true,
      products: productsClone.map(element => {
      if(this.state.edit === element.code) {
        element = elementEdit;
      }
      return element;
    })})
  };

  cancel = (start) => {
    this.setState({edit: start, editStart: start})
  };

  add = () => {
    this.setState({add: true, name: "", cost: "", url: "", country: "", edit: null, selectProductCode: null})
  };

  addProduct = (name, cost, url, country) => {
    let products = this.state.products.slice();
    products.push({name: name, cost: cost, url: url, country: country, code: Math.random()});
    this.setState({products: products, name: "", cost: "", url: "", country: "", add: false, editStart: false})
  };

  addCancel = (cancel) => {
    if(cancel) {
      this.setState({add: false, editStart: false, name: "", cost: "", url: "", country: ""})
    }
  };

  render () {
    let storeCode = this.props.store.map(element => {
      return (
      <tr key={element.id}>
        <td className='Store'>{element.name}</td>
        <td className='Store'>{element.foto}</td>
        <td className='Store'>{element.cost}</td>
        <td className='Store'>{element.url}</td>
        <td className='Store'>{element.country}</td>
        <td className='Store'>{element.control}</td>
      </tr>)});
      
    let productCode = this.state.products.map(element => {
       return (
       <Product key={element.code}
                code={element.code}
                name={element.name}
                foto={element.foto}
                cost={element.cost}
                url={element.url}
                country={element.country}
                selectProduct={this.state.selectProductCode}
                editStart={this.state.editStart}
                cbSelectProduct={this.selectProduct}
                cbDeleteProduct={this.deleteProduct}
                cbEditProduct={this.editProduct}
                edit={this.state.edit}
                add={this.state.add}/>)});
    
    let information = <Information 
                      name={this.state.name}
                      cost={this.state.cost}
                      country={this.state.country}/>

    let add = <tr>
      <td>
        <input type = 'button' value = 'New product' onClick={this.add} disabled={this.state.editStart || this.state.add}/>
      </td>
      </tr>;

    let edit = <AddEdit products={this.state.products}
                        edit={this.state.edit}
                        editStart={this.state.editStart}
                        add={this.state.add}
                        name={this.state.name}
                        cost={this.state.cost}
                        url={this.state.url}
                        country={this.state.country}
                        cbChange={this.change}
                        cbSave={this.save}
                        cbCancel={this.cancel}
                        cdAdd={this.addProduct}
                        cbAddCancel={this.addCancel}/>;
                
    return (
      <div>
        <table>
          <tbody>{storeCode}{productCode}{add}</tbody>
        </table>
        {((!this.state.edit) && (!this.state.stop) && (!this.state.add) && this.state.selectProductCode && <div>{information}</div>)}
        {((this.state.edit || this.state.add) && <table>{edit}</table>)}
      </div>)
  }
}

export default Store;