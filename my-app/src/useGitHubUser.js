import { useState, useEffect } from "react";
import useSWR from "swr";

function useGithubUser(username) {
    if (!username) {
        return {
            userData: null,
            loading: false,
            error: null,
            fetchUserData: () => { },
        };
    }

    const fetcher = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    const { data: userData, error, isValidating: loading } = useSWR(
        `https://api.github.com/users/${username}`,
        fetcher
    );

    return { userData, loading, error, fetchUserData: () => { } };
}

export default useGithubUser;