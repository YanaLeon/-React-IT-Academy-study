var Filter = React.createClass({

    displayName: 'Filter',

    propTypes: {
        words: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    },

    getInitialState: function() {
        return {
          checkboxCheck: false,
          filterText: ''
        };
    },

    sortArray: function (eo) {
        this.setState( {checkboxCheck: eo.target.checked});
    },

    filterArray: function (eo) {
        this.setState( {filterText: eo.target.value});
    },

    resetFilter: function () {
        this.setState( {checkboxCheck: false, filterText: ''});
    },

    render: function() {
        var array;
        if (this.state.checkboxCheck) {
            array = this.props.words.slice().sort();
        } else {
            array = this.props.words;
        }

        if (this.state.filterText !== '') {
            array = array.filter(element => {
                if (element.includes(this.state.filterText)) {
                    return element;
                }
            })
        };
        
        var wordsCode = array.map( (element, index) => {
            return React.DOM.div({key: index}, 
                React.DOM.span(null, element)
            )
        });

        return React.DOM.div( {className:'FilterBlock'},
        React.DOM.input( {type:'checkbox', checked: this.state.checkboxCheck, onChange: this.sortArray} ),
        React.DOM.input( {type:'text', value: this.state.filterText, onChange: this.filterArray} ),
        React.DOM.input( {type:'button',value:'сброс', onClick: this.resetFilter} ),
        React.DOM.div( {className: 'wordsBlock'}, wordsCode ),
        );
    },
});