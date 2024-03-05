import axios from "axios";

const BASE_URL = "http://localhost:3003/api/seats";

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const info = async () => {
    const response = await axios.get(`${BASE_URL}/info`);

    return response.data;
};

export default {
    setToken,
    info,
};
