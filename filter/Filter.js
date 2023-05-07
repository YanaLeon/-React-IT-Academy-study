var Filter = React.createClass({

    displayName: 'Filter',

    propTypes: {
        words: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    },

    getInitialState: function() {
        return {
            words: this.props.words,
            checkboxCheck: false,
            filterText: ''
        };
    },

    sortArray: function (eo) {
        this.setState( {checkboxCheck: eo.target.checked}, this.changeWords);
    },

    filterArray: function (eo) {
        this.setState( {filterText: eo.target.value}, this.changeWords);
    },

    resetFilter: function () {
        this.setState( {checkboxCheck: false, filterText: ''}, this.changeWords);
    },

    changeWords: function () {
        var array = this.props.words.slice();
        if (this.state.filterText !== '') {
            array = array.filter(element => element.includes(this.state.filterText))
        };
        if (this.state.checkboxCheck) {
            array.sort();
        }
        this.setState({words: array})
    },

    render: function() {
        
        var wordsCode = this.state.words.map( (element, index) => {
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