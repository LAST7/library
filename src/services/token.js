/**
 * Get the current user's token by extracting it from the window's localStorage
 *
 * @returns {string} - token start with `Bearer`
 */
const getToken = () => {
    const localTokenJSON = window.localStorage.getItem("localUser");
    // no local token found
    if (!localTokenJSON) {
        console.error("no local token found...");
        return null;
    }

    const localToken = JSON.parse(localTokenJSON).token;
    const bearerToken = `Bearer ${localToken}`;

    return bearerToken;
};

export default {
    getToken,
};
