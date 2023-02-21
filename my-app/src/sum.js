import React from "react";
function Sum(props) {
    const { numbers } = props;
    const sum = numbers ? numbers.reduce((total, number) => total + number, 0) : 0;

    return (
        <h1>The sum is {sum}</h1>
    );
}
export default Sum;