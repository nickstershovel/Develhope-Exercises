import React from "react";
//EVENTS 01-Exerecise
class ClickCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.initialValue ?? 0
        };
    }

    handleClick = () => {
        this.setState(prevState => ({ count: prevState.count + 1 }));
    };

    render() {
        return (
            <div>
                <p>Current count: {this.state.count}</p>
                <button onClick={this.handleClick}>Click me</button>
            </div>
        );
    }
}


export default ClickCounter;