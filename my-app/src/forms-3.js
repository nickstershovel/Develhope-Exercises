import React, { useState } from "react";
import "./index.css";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const handleLogin = () => {
        onLogin({ username, password, remember });
    };

    const handleReset = () => {
        setUsername("");
        setPassword("");
        setRemember(false);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                />
                Remember me
            </label>
            <button
                disabled={!username || !password}
                onClick={handleLogin}
                className={password.length < 8 ? "red" : "green"}
            >
                Login
            </button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default Login;