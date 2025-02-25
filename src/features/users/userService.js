import axios from "axios";

export const regUser = async (userData) => {
  const response = await axios.post(
    "http://localhost:3001/api/users/register-user",
    userData
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
export const logUser = async (userData) => {
  const response = await axios.post(
    "http://localhost:3001/api/users/login-user",
    userData
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
