import React from "react";
class Age extends React.Component {
    render() {
        return <p>Your age is {this.props.age}</p>;
    }
}

class Welcome extends React.Component {
    render(){
        <div>
        <p>Hello, {this.props.name}!</p>
        <Age age={this.props.age} />
        </div>
    }
}
Welcome.defaultProps = {
    name: "Guest"
};
export default Welcome;