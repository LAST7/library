import axios from "axios";

const BASE_URL = "http://localhost:3003/api/user/login";

/**
 * Login service
 *
 * @param {object} credentials - should be an object containing student id & password
 * @param {string} userType - user/admin
 * @returns {Promise<object>} - the user data returned by the backend server
 */
const login = async (credentials, userType) => {
    const response = await axios.post(`${BASE_URL}/${userType}`, credentials);
    return response.data;
};

export default { login };
