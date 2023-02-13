import React from "react";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            input: ""
        };
    }

    handleClick = () => {
        this.setState(prevState => ({
            items: [...prevState.items, prevState.input],
            input: ""
        }));
    };

    handleInputChange = (event) => {
        this.setState({ input: event.target.value });
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.input}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleClick}>Add</button>
                <ul>
                    {this.state.items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoList;
