import axios from "axios";

const BASE_URL = "http://localhost:3003/api/admin";

/**
 * Get info of the library's floor and penalty
 *
 * @returns {Promise<object>} - data returned from the backend server
 */
const getInfo = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const response = await axios.get(BASE_URL, config);
    return response.data;
};

const changeFloorStatus = async (floor_level, status, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const data = {
        floor_level,
        status,
    };

    const response = await axios.put(`${BASE_URL}/floor`, data, config);
    return response.data;
};

const getPenaltyType = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const response = await axios.get(`${BASE_URL}/penalty-type`, config);
    return response.data;
};

const getStudents = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const response = await axios.get(`${BASE_URL}/student`, config);
    return response.data;
};

const addPenalty = async (token, user_id, admin_id, penalty_type_id, until) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const data = {
        user_id,
        admin_id,
        penalty_type_id,
        until,
    };

    const response = await axios.post(`${BASE_URL}/penalty`, data, config);
    return response.data;
};

export default {
    getInfo,
    changeFloorStatus,
    getPenaltyType,
    getStudents,
    addPenalty,
};
