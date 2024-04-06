import axios from "axios";

// const BASE_URL = "http://localhost:3003/api/reservation";
const BASE_URL = "https://library.imlast.top/api/reservation";

import tokenService from "./token";

/**
 * Get reservation records of the current user.
 *
 * @returns {Promise<object>} - data returned from the backend server
 */
const getReservation = async () => {
    const config = {
        headers: { Authorization: tokenService.getToken() },
    };

    const response = await axios.get(`${BASE_URL}/info`, config);
    return response.data;
};

/**
 * Post the reservation of the user to backend server
 *
 * @param {object} reservationInfo - info about the reservation, should include `seat_number, floor_level, iTime, oTime`
 * @returns {Promise<object>} - data returned from the backend server
 */
const postReservation = async (reservationInfo) => {
    const config = {
        headers: { Authorization: tokenService.getToken() },
    };

    const response = await axios.post(`${BASE_URL}`, reservationInfo, config);
    return response.data;
};

export default {
    getReservation,
    postReservation,
};
