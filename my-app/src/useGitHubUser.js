import { useState, useEffect } from "react";

function useGithubUser(username) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data = await response.json();
            setUserData(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        if (username) {
            fetchUserData();
        }
    }, [username]);

    const refetch = () => {
        if (username) {
            fetchUserData();
        }
    };

    return { userData, loading, error, refetch };
}

export default useGithubUser;