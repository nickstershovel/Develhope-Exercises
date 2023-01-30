import React from "react";

class Welcome extends React.Component {
    render(){
        <p>Hello, {this.props.name}!</p>
    }
}
Welcome.defaultProps = {
    name: "Guest"
};
export default Welcome;