import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./props";
import Counter from "./state";
import GithubUser from "./git";
import { useParams } from "react-router-dom";

function ShowGithubUser() {
    const { username } = useParams();
    return <GithubUser username={username} />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome name="John" />} />
                <Route
                    path="/counter"
                    element={
                        <Counter
                            initialValue={3}
                            incrementAmount={0.89}
                            incrementInterval={1000}
                        />
                    }
                />
                <Route path="/users/:username" element={<ShowGithubUser />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;

