import {
  loginUser,
  registerUser,
  logout,
  getCurrentUser,
} from "../../services/auth.service";

const initialState = {
  user: {
    username: "",
    email: "",
    userAvatar: "",
    id: "",
  },
  accessToken: "",
  refreshToken: "",
  sid: "",
  isLoggedIn: false,
};

export default {
  namespaced: true,
  state: { ...initialState },
  mutations: {
    setRegisterUserData(state, userData) {
      state.user.username = userData.username;
      state.user.email = userData.email;
      state.user.userAvatar = userData.userAvatar;
      state.user.id = userData.id;
      state.accessToken = userData.accessToken;
      state.refreshToken = userData.refreshToken;
      state.sid = userData.sid;
      localStorage.setItem(
        "apartment-rent-auth",
        JSON.stringify({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          sid: state.sid,
        })
      );
    },
    setLoginUserData(state, userData) {
      state.user.username = userData.user.username;
      state.user.email = userData.user.email;
      state.user.userAvatar = userData.user.userAvatar;
      state.user.id = userData.user._id;
      state.accessToken = userData.accessToken;
      state.refreshToken = userData.refreshToken;
      state.sid = userData.sid;
      localStorage.setItem(
        "apartment-rent-auth",
        JSON.stringify({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          sid: state.sid,
        })
      );
    },
    setisLoggedIn(state, data) {
      state.isLoggedIn = data;
    },
    clearUserData(state) {
      localStorage.removeItem("apartment-rent-auth");
      Object.assign(state, { ...initialState });
    },
  },
  actions: {
    async registerUser({ commit }, payload) {
      const { data } = await registerUser(payload);
      commit("setRegisterUserData", data);
      commit("setisLoggedIn", true);
    },
    async login({ commit }, payload) {
      const { data } = await loginUser(payload);
      commit("setLoginUserData", data);
      commit("setisLoggedIn", true);
    },
    async logout({ commit }) {
      await logout();
      commit("clearUserData");
    },
    async getUser({ commit }, payload) {
      const { data } = await getCurrentUser(payload);
      commit("setLoginUserData", data);
      commit("setisLoggedIn", true);
    },
  },
};
