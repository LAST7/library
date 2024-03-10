/**
 * Get the current user's token by extracting it from the window's localStorage
 *
 * @returns {string} - token start with `Bearer`
 */
const getToken = () => {
    const localToken = JSON.parse(
        window.localStorage.getItem("localUser"),
    ).token;
    const bearerToken = `Bearer ${localToken}`;

    return bearerToken;
};

export default {
    getToken,
};
