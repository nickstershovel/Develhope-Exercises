import React, { useState, useEffect } from "react";
function ClickCounter({ initialValue, onCounterChange }) {
    const [count, setCount] = useState(initialValue ?? 0);

    useEffect(() => {
        onCounterChange(count);
    }, [count, onCounterChange]);

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