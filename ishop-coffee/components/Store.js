import React from 'react';

import './Store.css';

import Product from './Product'

class Store extends React.Component {

  render () {
    let storeCode = this.props.store.map(element => {
      return (
      <tr key={element.id}>
        <td className='Store'>{element.name}</td>
        <td className='Store'>{element.foto}</td>
        <td className='Store'>{element.cost}</td>
        <td className='Store'>{element.url}</td>
        <td className='Store'>{element.country}</td>
      </tr>)});
      
    let productCode = this.props.products.map(element => {
       return (
       <Product key={element.code}
                name={element.name}
                foto={element.foto}
                cost={element.cost}
                url={element.url}
                country={element.country}/>)});
                
    return (
    <table>
      <tbody className='Store'>{storeCode}{productCode}</tbody>
    </table>)
  }
}

export default Store;