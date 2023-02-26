import React, { useState } from 'react';
import GithubUser from './git';
import { Link, Outlet } from 'react-router-dom';

function GithubUserList() {
    const [usernames, setUsernames] = useState([]);
    const [newUsername, setNewUsername] = useState('');

    const handleAddUsername = () => {
        setUsernames(prevUsernames => [...prevUsernames, newUsername]);
        setNewUsername('');
    };

    const handleNewUsernameChange = event => {
        setNewUsername(event.target.value);
    };

    return (
        <div>
            <h1>Github User List</h1>
            <div>
                <input type="text" value={newUsername} onChange={handleNewUsernameChange} />
                <button onClick={handleAddUsername}>Add Username</button>
            </div>
            <ul>
                {usernames.map(username => (
                    <li key={username}>
                        <Link to={`${username}`}>{username}</Link>
                    </li>
                ))}
            </ul>
            <Outlet />
            {usernames.length === 0 && <p>Add a user and select it.</p>}
        </div>
    );
}

export default GithubUserList;