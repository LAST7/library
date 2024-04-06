import axios from "axios";

import tokenService from "./token";

// const BASE_URL = "http://localhost:3003/api/seat";
const BASE_URL = "https://library.imlast.top/api/seat";

/**
 * Get seat info of the library
 *
 * @returns {Promise<object>} - data returned from the backend server
 */
const getSeat = async () => {
    const config = {
        headers: { Authorization: tokenService.getToken() },
    };

    const response = await axios.get(`${BASE_URL}/info`, config);
    return response.data;
};

export default {
    getSeat,
};
