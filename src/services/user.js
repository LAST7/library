import axios from "axios";

const BASE_URL = "http://localhost:3003/api/user";

import tokenService from "./token";

/**
 * Get info about the current user
 *
 * @returns {Promise<object>} - data returned from the backend server
 */
const getInfo = async () => {
    const config = {
        headers: { Authorization: tokenService.getToken() },
    };

    const response = await axios.get(`${BASE_URL}/info`, config);
    return response.data;
};

/**
 * Change the password of the current user.
 *
 * @param {object} credentials - should be an object containing both old & new password
 * @returns {Promise<object>} - status code and response data
 */
const changePasswd = async (credentials) => {
    const config = {
        headers: { Authorization: tokenService.getToken() },
    };

    const response = await axios.put(
        `${BASE_URL}/changepasswd`,
        credentials,
        config,
    );

    return response.data;
};

export default {
    getInfo,
    changePasswd,
};
