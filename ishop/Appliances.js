var Appliances = React.createClass({

    displayName: 'Appliances',

    propTypes: {
        caption: React.PropTypes.string.isRequired,
        header:  React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        products: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
      },
  
    render: function() {
        var headerLayout = this.props.header.map(element => {
            return React.DOM.tr({key: element.id},
                React.DOM.th({className:'AppliancesTH'}, element.nameTH),
                React.DOM.th({className:'AppliancesTH'}, element.costTH),
                React.DOM.th({className:'AppliancesTH'}, element.fotoTH),
                React.DOM.th({className:'AppliancesTH'}, element.countTH),
                )
        });
        var productsLayout = this.props.products.map(element => {
            return React.DOM.tr({key: element.model},
                React.DOM.td({className:'AppliancesTD'}, element.nameTD),
                React.DOM.td({className:'AppliancesTD'}, element.costTD),
                React.DOM.td( 
                    {className:'AppliancesTD'}, 
                    React.DOM.img({src: element.fotoTD, className:'Foto'})
                    ),
                React.DOM.td({className:'AppliancesTD'}, element.countTD));
        });
        return React.DOM.table ({className: 'AppliancesTable'},
        React.DOM.caption( null, this.props.caption ),
        React.DOM.tbody( null, headerLayout, productsLayout ))
    },
});