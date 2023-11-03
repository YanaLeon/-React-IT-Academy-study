import React from 'react';

import './Product.css';

class Product extends React.Component {

    select = (eo) => {
        if((!this.props.add) && (!this.props.editStart)) {
            this.props.cbSelectProduct(this.props.code, null, this.props.name, this.props.cost, this.props.country)
        }
    }

    delete = (eo) => {
        eo.stopPropagation();
        this.props.cbDeleteProduct(this.props.code)
    };

    edit = (eo) => {
        eo.stopPropagation();
        this.props.cbEditProduct(this.props.code, this.props.name, this.props.cost, this.props.url, this.props.country)
    };

    render () {
        return (
        <tr style={{background:this.props.selectProduct===this.props.code?'orange':'white'}} onClick={this.select}>
            <td className='Product'>{this.props.name}</td>
            <td className='Product'><img src={this.props.foto} width={100} height={100}/></td>
            <td className='Product'>{this.props.cost}</td>
            <td className='ProductURL'><a href={this.props.url}>{this.props.url}</a></td>
            <td className='Product'>{this.props.country}</td>
            <td className='Product'>
                {(this.props.editStart || this.props.add) ?
                    <div><input type='button' value="Edit" onClick={this.edit} disabled/><input type='button' value="Delete" onClick={this.delete} disabled/></div>
                    :
                    <div><input type='button' value="Edit" onClick={this.edit}/><input type='button' value="Delete" onClick={this.delete}/></div>
                    }
            </td>
        </tr>)
    }
}

export default Product;