// import React from "react";
// class Age extends React.Component {
//     render() {
//         return this.props.age > 18 ? (
//             <p>Your age is {this.props.age}</p>
//         ) : (
//             <p>You are very young!</p>
//         );
//     }
// }

// class Welcome extends React.Component {
//     render(){
//         return(
//         <div>
//         <p>Hello, {this.props.name}!</p>
//         {this.props.age > 18 &&
//                 this.props.age < 65 &&
//                 this.props.name === "John" && (
//                     <Age age={this.props.age} />
//                 )}
//         </div>
//         )
//     }
// }
// Welcome.defaultProps = {
//     name: "Guest"
// };
// export default Welcome;
import React from "react";

function Welcome(props) {
    const { name = "Guest", age } = props;

    return (
        <div>
            <p>Hello, {name}!</p>
            {age > 18 && age < 65 && name === "John" && (
                <p>Your age is {age}</p>
            )}
            {!(age > 18 && age < 65 && name === "John") && (
                <p>You are very young!</p>
            )}
        </div>
    );
}

export default Welcome;