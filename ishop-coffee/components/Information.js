import React from 'react';

class Information extends React.Component {



    render () {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <p>{"Name: "}{this.props.name}</p>
                <p>{"Price: "}{this.props.cost}</p>
                <p>{"Country: "}{this.props.country}</p>
            </div>
        )
    }

}

export default Information;