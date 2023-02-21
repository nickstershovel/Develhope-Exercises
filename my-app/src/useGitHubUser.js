import { useState, useEffect } from "react";

function useGithubUser(username) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data = await response.json();
            setUserData(data);
        }
        fetchUserData();
    }, [username]);

    return userData;
}