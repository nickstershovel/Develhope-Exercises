import React from "react";

class ClickTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastButton: "",
        };
    }

    handleClick = (event) => {
        this.setState({ lastButton: event.target.innerHTML });
    };

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Button 1</button>
                <button onClick={this.handleClick}>Button 2</button>
                <button onClick={this.handleClick}>Button 3</button>
                <h1>Last button pressed: {this.state.lastButton}</h1>
            </div>
        );
    }
}

export default ClickTracker;