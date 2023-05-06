var Product = React.createClass({

    displayName: 'Product',
  
    propTypes: {
      name: React.PropTypes.string.isRequired,
      cost: React.PropTypes.number.isRequired,
      url: React.PropTypes.string.isRequired,
      quantity: React.PropTypes.number.isRequired,
      control: React.PropTypes.string.isRequired,
      code: React.PropTypes.number.isRequired,
      cbProductDelete: React.PropTypes.func.isRequired,
      cbColorProduct: React.PropTypes.func.isRequired,
      colorProduct: React.PropTypes.any
    },

    deleteProduct: function () {
        this.props.cbProductDelete(this.props.code);
        
    },

    colorProduct: function () {
        this.props.cbColorProduct(this.props.name);
    },

    render: function() {

        return React.DOM.tr({style:{backgroundColor:(this.props.colorProduct === this.props.name)?'orange':'white'}},
            React.DOM.td({onClick: this.colorProduct, className: 'Product'}, this.props.name),
            React.DOM.td({onClick: this.colorProduct, className: 'Product'}, this.props.cost),
            React.DOM.td({onClick: this.colorProduct, className: 'Product'}, this.props.url),
            React.DOM.td({onClick: this.colorProduct, className: 'Product'}, this.props.quantity),
            React.DOM.td(null, 
                React.DOM.input ({type:'button', value: this.props.control, className: 'Product', onClick: this.deleteProduct})
            ),
        )
    },
  
  });

