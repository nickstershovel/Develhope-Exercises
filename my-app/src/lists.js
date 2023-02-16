import React from "react";
import List from "./todolist";
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

    handleRemoveClick = (index) => {
        this.setState(prevState => ({
            items: prevState.items.filter((_, i) => i !== index)
        }));
    };

    handleResetClick = () => {
        this.setState({ items: [] });
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
                <button onClick={this.handleResetClick}>Reset</button>
                <List handleRemoveClick={this.handleRemoveClick} items={this.state.items}/>
                {/* <ul>
                    {this.state.items.map((item, index) => (
                        <li key={index}>
                            {item}
                            <button onClick={() => this.handleRemoveClick(index)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul> */}
            </div>
        );
    }
}

export default TodoList;