import React, { useState, useEffect } from "react";


function GithubUser(props) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            const response = await fetch(`https://api.github.com/users/${props.username}`);
            const data = await response.json();
            setUserData(data);
        }
        fetchUserData();
    }, [props.username]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>Username: {userData.login}</p>
            <p>Number of public repositories: {userData.public_repos}</p>
            <p>Followers: {userData.followers}</p>
            <p>Following: {userData.following}</p>
            <p>Profile URL: <a href={userData.html_url}>{userData.html_url}</a></p>
            <img src={userData.avatar_url} alt="User avatar" />
        </div>
    );
}

export default GithubUser;