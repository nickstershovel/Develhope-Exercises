import React from "react";
import { render } from "react-dom";
import Hello from "./components-2"
import Welcome from "./props"
import Counter from "./state";
import ClickCounter from "./events-1";
import ClickTracker from "./events-3";
import InteractiveWelcome from "./forms";

class App extends React.Component {
    render() {
        return(
        <div>
            <Hello />
            <Welcome name={<strong>Patrizio</strong>} age={25}/>
            <Counter initialValue={3} incrementAmount={0.89} incrementInterval={1000}/>
            <ClickCounter />
            <ClickTracker />
            <InteractiveWelcome/>
        </div>
        )
    }
}
render(<App />, document.getElementById("root"));
export default App;