import React from "react";

class List extends React.Component {
    constructor(props) {
        super(props);
    }
    render()
    {
        return(
            <ul>
            {this.props.items.map((item, index) => (
                <li key={index}>
                    {item}
                    <button onClick={() => this.props.handleRemoveClick(index)}>
                        Remove
                    </button>
                </li>
            ))}
        </ul>
        )
    }
}
export default List;