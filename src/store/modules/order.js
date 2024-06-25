import { getOrders, bookApartment } from "../../services/order.service";

const initialState = {
  orders: [],
  message: null,
};

export default {
  namespaced: true,
  state: { ...initialState },
  mutations: {
    setOrdersData(state, data) {
      state.orders = data;
    },
    clearOrdersData(state) {
      Object.assign(state, { ...initialState });
    },
    setMessage(state, data) {
      state.message = data;
    },
  },
  actions: {
    async createOrder({ commit }, payload) {
      const { data } = await bookApartment(payload);
      commit("setMessage", data);
    },

    async getOrdersData({ commit }) {
      const { data } = await getOrders();
      commit("setOrdersData", data);
    },
  },
};
