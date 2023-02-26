import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./props";
import Counter from "./state";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome name="John" />} />
                <Route path="/counter" element={<Counter initialValue={3} incrementAmount={0.89} incrementInterval={1000}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
