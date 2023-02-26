import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Welcome from "./props";
import Counter from "./state";
import GithubUser from "./git";
import { useParams } from "react-router-dom";
import GithubUserList from "./githublist";

function ShowGithubUser() {
    const { username } = useParams();
    return <GithubUser username={username} />;
}
function NotFound() {
    return <h1>404 Not Found</h1>;
}

function App() {
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Welcome</Link>
                        </li>
                        <li>
                            <Link to="/counter">Counter</Link>
                        </li>
                        <li>
                            <Link to="/users">Github Users</Link>
                        </li>
                    </ul>
                </nav>

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
                    <Route path="/users" element={<GithubUserList />}>
                        <Route path=":username" element={<ShowGithubUser />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;

