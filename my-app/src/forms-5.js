import React, { useRef } from "react";

const UncontrolledLogin = ({ onLogin }) => {
const usernameRef = useRef(null);
const passwordRef = useRef(null);
const rememberRef = useRef(null);
const handleLogin = () => {
    onLogin({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        remember: rememberRef.current.checked
    });
};

return (
    <div>
        <input type="text" placeholder="Username" ref={usernameRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <label>
            <input type="checkbox" ref={rememberRef} />
            Remember me
        </label>
        <button onClick={handleLogin}>Login</button>
    </div>
);
};

export default UncontrolledLogin;