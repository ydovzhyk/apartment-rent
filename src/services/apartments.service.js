import axios from "../utils/axios";

export const createApartment = (userData) => {
  return axios.post("/apartments/create", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getApartmentsFilterList = ({ page, city, price }) => {
  return axios.get("/apartments/filter", {
    params: {
      page,
      city,
      price,
    },
  });
};

export const getApartmentByIdData = (id) => {
  return axios.get(`/apartments/${id}`);
};

export const checkAvailabilityAxios = (userData) => {
  return axios.post("/apartments/check", userData);
};
