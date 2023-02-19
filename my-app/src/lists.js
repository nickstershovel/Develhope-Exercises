import React, { useState } from "react";
import List from "./todolist";

function TodoList() {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState("");

    const handleClick = () => {
        setItems([...items, input]);
        setInput("");
    };

    const handleRemoveClick = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleResetClick = () => {
        setItems([]);
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <div>
            <input type="text" value={input} onChange={handleInputChange} />
            <button onClick={handleClick}>Add</button>
            <button onClick={handleResetClick}>Reset</button>
            <List handleRemoveClick={handleRemoveClick} items={items} />
        </div>
    );
}

export default TodoList;