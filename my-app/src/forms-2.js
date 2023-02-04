import React, { useState } from "react";

const Login = () => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [remember, setRemember] = useState(false);
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
    </div>
);
};

export default Login;