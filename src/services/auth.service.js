import axios from "../utils/axios";

// export const loginUser = (payload) => {
//   return axios.post('/users/login', payload);
// };

// export const registerUser = (payload) => {
//   return axios.post('/users/register', payload);
// };

// export const logout = () => {
//   return axios.post('/users/logout');
// };

export const loginUser = (payload) => {
  return axios.post("/auth/login", payload);
};

export const registerUser = (payload) => {
  return axios.post("/auth/register", payload);
};

export const logout = () => {
  return axios.post("/auth/logout");
};

export const getCurrentUser = (payload) => {
  return axios.post("/auth/current", payload);
};
