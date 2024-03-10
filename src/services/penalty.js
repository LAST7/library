import axios from "axios";

const BASE_URL = "http://localhost:3003/api/penalty";

import tokenService from "./token";

/**
 * Get penalty records of the current user.
 *
 * @returns {Promise<object>} - data returned from the backend server
 */
const getPenalty = async () => {
    const config = {
        headers: { Authorization: tokenService.getToken() },
    };

    const response = await axios.get(`${BASE_URL}/info`, config);
    return response.data;
};

export default {
    getPenalty,
};
