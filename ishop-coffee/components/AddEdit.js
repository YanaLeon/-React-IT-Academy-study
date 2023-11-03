import React from 'react';

class AddEdit extends React.Component {

    state = {
        name: this.props.name,
        cost: this.props.cost,
        url: this.props.url,
        country: this.props.country,
        errorName: false,
        errorCost: false,
        errorURL: false,
        errorCountry: false
    };

     changeName = (eo) => {
         if (eo.target.value === '') {
             this.setState({errorName: true, name: eo.target.value});
         } else {
             this.props.cbChange(true);
             this.setState({errorName: false, name: eo.target.value});
         }
     };
    
     changeCost = (eo) => {
         if (eo.target.value === '') {
             this.setState({errorCost: true, cost: eo.target.value});
         } else {
             this.props.cbChange(true);
             this.setState({errorCost: false, cost: eo.target.value});
         }
     };
    
     changeURL = (eo) => {
         if (eo.target.value === '') {
             this.setState({errorURL: true, url: eo.target.value});
         } else {
             this.props.cbChange(true);
             this.setState({errorURL: false, url: eo.target.value});
         }
     };
    
     changeCountry = (eo) => {
         if (eo.target.value === '') {
             this.setState({errorCountry: true, country: eo.target.value});
         } else {
             this.props.cbChange(true);
             this.setState({errorCountry: false, country: eo.target.value});
         }
     };
    
     save = (eo) => {
         this.props.cbSave(this.props.edit, this.state.name, this.state.cost, this.state.url, this.state.country)
     };

    componentDidUpdate = (oldProps, oldState) => {
        if(oldProps.country!==this.props.country) {
            this.setState({name: this.props.name, cost: this.props.cost, url: this.props.url,country: this.props.country})
        }
    };

    cancel = () => {
        this.props.cbCancel(false);
    };

    add = () => {
        this.props.cdAdd(this.state.name, this.state.cost, this.state.url, this.state.country)
    }

    addCancel = () => {
        this.props.cbAddCancel(true);
        this.setState({errorName: false, errorCost: false, errorURL: false, errorCountry: false})
    };
    
    render () {
        let component;
        if (this.props.edit) {
            component = <tbody>
            <tr className='Info'><td colSpan='3'>Edit existing Product</td></tr>
            <tr>
                <td colSpan='2'>{'Name:'}</td>
                <td><input type='text' value={this.state.name} onChange={this.changeName}/></td>
                <td colSpan='2'>{(this.state.errorName)? 'Please, fill the filed':null}</td>
            </tr>
            <tr>
                  <td colSpan='2'>{'Price:'}</td>
              <td><input type='text' value={this.state.cost} onChange={this.changeCost}/></td>
              <td colSpan='2'>{(this.state.errorCost)? 'Please, fill the filed':null}</td>
            </tr>
            <tr>
                  <td colSpan='2'>{'URL:'}</td>
              <td><input type='text' value={this.state.url} onChange={this.changeURL}/></td>
              <td colSpan='2'>{(this.state.errorURL)? 'Please, fill the filed':null}</td>
            </tr>
            <tr>
                  <td colSpan='2'>{'Country:'}</td>
              <td><input type='text' value={this.state.country} onChange={this.changeCountry}/></td>
              <td colSpan='2'>{(this.state.errorCountry)? 'Please, fill the filed':null}</td>
            </tr>
            <tr>
                <td><input type="button" value='Save' onClick={this.save} disabled={(!this.props.editStart) || (this.state.errorName || this.state.errorCost || this.state.errorURL || this.state.errorCountry)}/>
                <input type='button' value='Cancel' onClick={this.cancel} /></td>
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
              <td><input type='text' value={this.state.country} onChange={this.changeCountry}/></td>
              <td className='Error' colSpan='2'>{(this.state.errorCountry)? 'Please, fill the filed':null}</td>
            </tr>
            <tr>
              <td><input type="button" value='Add' onClick={this.add} disabled={!this.state.name || !this.state.cost || !this.state.url || !this.state.country 
                                                                                        || this.state.errorName || this.state.errorCost || this.state.errorURL || this.state.errorQuantity}/>
              <input type='button' value='Cancel' onClick={this.addCancel}/></td>
            </tr>
          </tbody>;
        }
        return component
    }
}

export default AddEdit;