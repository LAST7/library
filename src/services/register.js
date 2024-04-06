import axios from "axios";

// const BASE_URL = "http://localhost:3003/api/register";
const BASE_URL = "https://library.imlast.top/api/register";

/**
 * Register service
 *
 * @param {object} credentials - should be an object containing student id & password
 * @returns {Promise<object>} - the user data returned by the backend server
 */
const register = async (credentials) => {
    const response = await axios.post(BASE_URL, credentials);
    return response.data;
};

export default { register };
