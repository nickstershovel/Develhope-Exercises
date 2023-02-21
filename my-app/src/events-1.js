import React, { useState } from "react";

function ClickCounter(props) {
    const [count, setCount] = useState(props.initialValue ?? 0);

    const handleClick = () => {
        setCount(prevCount => prevCount + 1);
    };

    return (
        <div>
            <p>Current count: {count}</p>
            <button onClick={handleClick}>Click me</button>
        </div>
    );
}

export default ClickCounter;