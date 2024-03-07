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
