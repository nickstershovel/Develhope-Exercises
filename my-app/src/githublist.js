import React, { useState } from 'react';
import GithubUser from './git';

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
            <div>
                {usernames.map(username => (
                    <GithubUser key={username} username={username} />
                ))}
            </div>
        </div>
    );
}

export default GithubUserList;