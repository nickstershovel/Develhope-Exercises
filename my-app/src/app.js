import React from "react";
import App from "../../Components-3/exercise";
import { ReactDOM } from "react-dom";
import Hello from "../Components-2/exercise"
import Welcome from "../Props-1/exercise"

ReactDOM.render(<App />, document.getElementById('root'));
class App extends React.Component {
    render() {
        <div>
            <Hello />
            <Welcome name="Patrizio"/>
        </div>
    }
}

export default App;