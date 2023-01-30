import React from "react";
class Age extends React.Component {
    render() {
        return <p>Your age is {this.props.age}</p>;
    }
}

class Welcome extends React.Component {
    render(){
        return(
        <div>
        <p>Hello, {this.props.name}!</p>
        {this.props.age > 18 && this.props.age < 65 && (
                    <Age age={this.props.age} />
        )}
        </div>
        )
    }
}
Welcome.defaultProps = {
    name: "Guest"
};
export default Welcome;