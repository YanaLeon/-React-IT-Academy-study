var Store = React.createClass({

    displayName: 'Store',
  
    propTypes: {
        store: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        products: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },
  
    getInitialState: function() {
      return { 
        products: this.props.products,
        deleteProduct: null,
        colorProduct: null
      };
    },
  
    productDelete: function(name) {
      var answer = confirm ('Хотите удалить товар? Если да нажмите "ОК", если нет нажмите "Отмена"');
      if (answer) {
        this.setState( {deleteProduct: name} );
      }
    },

    colorProduct: function (name) {
        this.setState( {colorProduct: name} );
    },

    render: function() {
        if (this.state.deleteProduct) {
            this.state.products = this.state.products.filter((element) => {
                if (element.name !== this.state.deleteProduct) {
                    return element;
                }
            })
        } 
        var storeCode = this.props.store.map(element => {
            return React.DOM.tr({key: element.id},
                React.DOM.th({className:'Store'}, element.name),
                React.DOM.th({className:'Store'}, element.cost),
                React.DOM.th({className:'Store'}, element.url),
                React.DOM.th({className:'Store'}, element.quantity),
                React.DOM.th({className:'Store'}, element.control)
                )
        });

        var productCode = this.state.products.map(element => {
            return React.createElement(Product, 
                {key: element.code,
                name: element.name, 
                cost: element.cost,
                url: element.url, 
                quantity: element.quantity,
                control: element.control,
                cbProductDelete: this.productDelete,
                cbColorProduct: this.colorProduct,
                colorProduct: this.state.colorProduct})
            });
            
            return React.DOM.tbody( {className:'Store'}, storeCode, productCode);
        },
});