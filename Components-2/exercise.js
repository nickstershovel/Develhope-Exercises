import React from "react";
class Message extends React.Component { 
    render() {
        <p>What a beautiful day!</p>
    }
}

class Hello extends React.Component {
    render() {
        <h1>Hello, world!
            <Message />
        </h1>
    }
}

export default Hello;