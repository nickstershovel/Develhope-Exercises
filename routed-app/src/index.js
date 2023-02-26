import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./props";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome name="John" />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
