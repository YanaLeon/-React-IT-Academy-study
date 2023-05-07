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

    deleteProduct: function (eo) {
        eo.stopPropagation();
        this.props.cbProductDelete(this.props.code);
        
    },

    colorProduct: function () {
        this.props.cbColorProduct(this.props.code);
    },

    render: function() {

        return React.DOM.tr({onClick: this.colorProduct, style:{backgroundColor:(this.props.colorProduct === this.props.code)?'orange':'white'}},
            React.DOM.td({className: 'Product'}, this.props.name),
            React.DOM.td({className: 'Product'}, this.props.cost),
            React.DOM.td({className: 'Product'}, this.props.url),
            React.DOM.td({className: 'Product'}, this.props.quantity),
            React.DOM.td(null, 
                React.DOM.input ({type:'button', value: this.props.control, className: 'Product', onClick: this.deleteProduct})
            ),
        )
    },
  
  });

