import axios from "axios";

const API_URL = "https://personal-budget-tracker-backend.onrender.com"; // Replace with your actual API URL
// const API_URL = "http://localhost:5000";

export const getLoginUser = async (user) => {
  const url = `${API_URL}/api/user/login`;
  return await axios.post(url, user);
};

export const getRegisterUser = async (user) => {
  const url = `${API_URL}/api/user/register`;
  return await axios.post(url, user);
};
