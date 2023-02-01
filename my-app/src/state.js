import React from 'react';

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
class CounterDisplay extends React.Component {
    render (){
        return (
        <h1>Count: {this.props.count}</h1>
        )
    }
}
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.initialValue
        };
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState(prevState => ({
                count: prevState.count + this.props.incrementAmount
            }));
        }, this.props.incrementInterval);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <div>
                <CounterDisplay count={this.state.count}/>
            </div>
        );
    }
}
export default Counter;