import React from "react";
class Message extends React.Component { 
    render() {
        return(
        <p>What a beautiful day!</p>
        )
    }
}

class Hello extends React.Component {
    render() {
        return(
        <h1>Hello, world!
            <Message />
        </h1>
        )
    }
}

export default Hello;