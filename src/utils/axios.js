import axios from "axios";
import store from "../store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

async function getAuthDataFromLocalStorage() {
  const dataFromLocalStorage = localStorage.getItem("apartment-rent-auth");
  if (dataFromLocalStorage) {
    return JSON.parse(dataFromLocalStorage);
  }
  return null;
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const { accessToken } = store.state.auth;
    if (accessToken && config.url !== "/auth/refresh") {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      const authData = await getAuthDataFromLocalStorage();
      if (authData && authData.accessToken && config.url !== "/auth/refresh") {
        config.headers["Authorization"] = `Bearer ${authData.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response.status === 401 &&
      error.response.data.message === "Unauthorized"
    ) {
      try {
        const authData = await getAuthDataFromLocalStorage();
        if (authData.refreshToken) {
          const { refreshToken, sid } = authData;

          axiosInstance.defaults.headers.Authorization = `Bearer ${refreshToken}`;
          const { data } = await axiosInstance.post("/auth/refresh", { sid });

          const authNewData = {
            accessToken: data.newAccessToken,
            refreshToken: data.newRefreshToken,
            sid: data.sid,
          };

          await localStorage.setItem(
            "apartment-rent-auth",
            JSON.stringify(authNewData)
          );
        } else {
          return Promise.reject(error);
        }

        if (error.config.url === "/auth/current") {
          const authData = await getAuthDataFromLocalStorage();
          if (authData.accessToken) {
            const { accessToken, refreshToken, sid } = authData;
            const originalRequest = error.config;
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            originalRequest.data = {
              accessToken: accessToken,
              refreshToken: refreshToken,
              sid: sid,
            };
            return axiosInstance(originalRequest);
          } else {
            return Promise.reject(error);
          }
        } else {
          const authData = await getAuthDataFromLocalStorage();
          if (authData.accessToken) {
            const { accessToken } = authData;
            const originalRequest = error.config;
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);
          } else {
            return Promise.reject(error);
          }
        }
      } catch (error) {
        return Promise.reject(error);
      }
    } else if (
      error.response.status === 401 &&
      error.response.data.message === "Refresh end, please login again"
    ) {
      const authData = {
        accessToken: null,
        refreshToken: null,
        sid: null,
      };
      localStorage.setItem("apartment-rent-auth", JSON.stringify(authData));
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;

// baseURL: "https://apt-booking-api.herokuapp.com/",
