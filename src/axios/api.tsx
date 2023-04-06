import axios from "axios";

const API_BASE_URL = "https://v1336-api-test.onrender.com/getBrigadesData";

export const getBrigades = async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
};
