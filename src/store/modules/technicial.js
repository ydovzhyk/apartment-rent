import animal from "../../assets/img/create_appartment/animal.png";
import appartment from "../../assets/img/create_appartment/appartment.png";
import balcony from "../../assets/img/create_appartment/balcony.png";
import bathroom from "../../assets/img/create_appartment/bathroom.png";
import family from "../../assets/img/create_appartment/family.png";
import gym from "../../assets/img/create_appartment/gym.png";
import nosmoking from "../../assets/img/create_appartment/nosmokingpng.png";
import parking from "../../assets/img/create_appartment/parking.png";
import transfer from "../../assets/img/create_appartment/transfer.png";
import wifi from "../../assets/img/create_appartment/wifi.png";

const initialState = {
  cities: [
    "Київ",
    "Одеса",
    "Полтава",
    "Харків",
    "Дніпро",
    "Львів",
    "Херсон",
    "Житомир",
  ],
  currency: ["UAH", "USD", "EUR"],
  services: [
    { name: "Дозволено з тваринами", icon: animal },
    { name: "Апартаменти", icon: appartment },
    { name: "Балкон", icon: balcony },
    { name: "Ванна кімната", icon: bathroom },
    { name: "Сімейні номери", icon: family },
    { name: "Фітнес центр", icon: gym },
    { name: "У нас не курять", icon: nosmoking },
    { name: "Приватна парковка", icon: parking },
    { name: "Трансфер з/в аеропорт", icon: transfer },
    { name: "Безкоштовний Wi-Fi", icon: wifi },
  ],
  error: null,
  message: null,
  loading: false,
};

export default {
  namespaced: true,
  state: { ...initialState },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    startLoading({ commit }) {
      commit("setLoading", true);
    },
    stopLoading({ commit }) {
      commit("setLoading", false);
    },
  },
};
