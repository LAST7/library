import axios from "axios";

const BASE_URL = "http://localhost:3003/api/seats";

const info = async () => {
    const response = await axios.get(`${BASE_URL}/info`);

    return response.data;
};

export default {
    info,
};
