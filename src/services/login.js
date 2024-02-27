import axios from "axios";

const BASE_URL = "http://localhost:3003/api/login";

/**
 * Login service
 *
 * @param {object} credentials - should be an object containing the username and password
 * @returns {object} - the data returned by the backend server
 */
const login = async (credentials) => {
    const response = await axios.post(BASE_URL, credentials);
    return response.data;
};

export default { login };
