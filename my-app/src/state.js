import React, { useState, useEffect } from 'react';
//STATE 01-Exercise
// class Counter extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0
//         };
//     }

//     componentDidMount() {
//         this.intervalId = setInterval(() => {
//             this.setState(prevState => ({
//                 count: prevState.count + 1
//             }));
//        }, 1000);
//     }

//     componentWillUnmount() {
//         clearInterval(this.intervalId);
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Count: {this.state.count}</h1>
//             </div>
//         );
//     }
// }


// STATE 03-Exercise
// class Counter extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: this.props.initialValue
//         };
//     }

//     componentDidMount() {
//         this.intervalId = setInterval(() => {
//             this.setState(prevState => ({
//                 count: prevState.count + this.props.incrementAmount
//             }));
//         }, this.props.incrementInterval);
//     }

//     componentWillUnmount() {
//         clearInterval(this.intervalId);
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Count: {this.state.count}</h1>
//             </div>
//         );
//     }
// }
//STATE 04-Exercise


function CounterDisplay(props) {
    return (
        <h1>Count: {props.count}</h1>
    );
}

function Counter(props) {
    const [count, setCount] = useState(props.initialValue);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount(prevCount => prevCount + props.incrementAmount);
        }, props.incrementInterval);

        return () => {
            clearInterval(intervalId);
        };
    }, [props.incrementAmount, props.incrementInterval]);

    return (
        <div>
            <CounterDisplay count={count} />
        </div>
    );
}

export default Counter;