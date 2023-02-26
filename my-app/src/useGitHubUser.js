import useSWR from "swr";

function useGithubUser(username) {
    const { data, error } = useSWR(`https://api.github.com/users/${username}`);

    return {
        userData: data,
        loading: !error && !data,
        error,
    };
}