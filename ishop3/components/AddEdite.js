import React from 'react';
import PropTypes from 'prop-types';

import './AddEdite.css';

class AddEdite extends React.Component {
    static propTypes = {
        products: PropTypes.array.isRequired,
        edit: PropTypes.any,
        editStart: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        cost: PropTypes.any.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.any.isRequired,
        cbChangeName: PropTypes.func.isRequired,
        cbChangeCost: PropTypes.func.isRequired,
        cbChangeURL: PropTypes.func.isRequired,
        cbChangeQuantity: PropTypes.func.isRequired,
        cbSave: PropTypes.func.isRequired,
        add: PropTypes.bool.isRequired,
        cbAddButton: PropTypes.func.isRequired,
        cbAddCancel: PropTypes.func.isRequired,
        cbCancel: PropTypes.func.isRequired
    };

    state = {
        name: this.props.name,
        cost: this.props.cost,
        url: this.props.url,
        quantity: this.props.quantity,
        errorName: false,
        errorCost: false,
        errorURL: false,
        errorQuantity: false
      };

    changeName = (eo) => {
        if (eo.target.value === '') {
            this.setState({errorName: true, name: eo.target.value});
        } else {
            this.props.cbChangeName(true);
            this.setState({errorName: false, name: eo.target.value});
        }
      };
    
      changeCost = (eo) => {
        if (eo.target.value === '') {
            this.setState({errorCost: true, cost: eo.target.value})
        } else {
            this.props.cbChangeCost(true);
            this.setState({errorCost: false, cost: eo.target.value})
        }
      };
    
      changeURL = (eo) => {
        if (eo.target.value === '') {
            this.setState({errorURL: true, url: eo.target.value})
        } else {
            this.props.cbChangeURL(true);
            this.setState({errorURL: false, url: eo.target.value})
        }
      };
    
      changeQuantity = (eo) => {
        if (eo.target.value === '') {
            this.setState({errorQuantity: true, quantity: eo.target.value})
        } else {
            this.props.cbChangeQuantity(true);
            this.setState({errorQuantity: false, quantity: eo.target.value})
        }
      };
    
      save = () => {
       this.props.cbSave(this.state.name, this.state.cost, this.state.url, this.state.quantity);
       this.setState({name: '', cost: '', url: '', quantity: ''})
      };
    
      cancel = () => {
        this.props.cbCancel(false)
        this.props.products.map(element => {
            if(this.props.edit === element.code) {
              this.setState({name: element.name, cost: element.cost, url: element.url, quantity: element.quantity,
                errorName: false, errorCost: false, errorURL: false, errorQuantity: false})
            }
          })
      };
      
      componentDidUpdate = (oldProps, oldState) => { 
        console.log('componentDidUpdate');     
        if ( oldProps.name !== this.props.name || oldProps.cost !== this.props.cost || oldProps.url !== this.props.url || oldProps.quantity !== this.props.quantity)   
          this.setState({name: this.props.name, cost: this.props.cost, url: this.props.url, quantity: this.props.quantity});
      };
    
      addProduct = () => {
        this.props.cbAddButton(this.state.name, this.state.cost, this.state.url, this.state.quantity, "Edit", "Delete");
      };

      addCancel = () => {
        this.props.cbAddCancel(true);
        this.setState({errorName: false, errorCost: false, errorURL: false, errorQuantity: false})
      }
    render () {
        let component;
        if (this.props.edit) {
            component = <tbody>
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
              <td><input type="button" value={'Save'} onClick={this.save} disabled={(!this.props.editStart) || (this.state.errorName || this.state.errorCost || this.state.errorURL || this.state.errorQuantity)}/>
              <input type='button' value={'Cancel'} onClick={this.cancel} disabled={!this.props.editStart}/></td>
            </tr>
           </tbody>
        } else if (this.props.add) {
            component = <tbody>
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
              <td><input type="button" value={'Add'} onClick={this.addProduct} disabled={!this.state.name || !this.state.cost || !this.state.url || !this.state.quantity 
                                                                                        || this.state.errorName || this.state.errorCost || this.state.errorURL || this.state.errorQuantity}/>
              <input type='button' value={'Cancel'} onClick={this.addCancel}/></td>
            </tr>
          </tbody>;
        }
        return component
    }
}

export default AddEdite;