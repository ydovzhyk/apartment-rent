import { createStore } from "vuex";
import authModule from "./modules/auth";
import apartmentModule from "./modules/apartment";
import orderModule from "./modules/order.js";
import technicialModule from "./modules/technicial.js";

const store = createStore({
  modules: {
    auth: authModule,
    apartment: apartmentModule,
    order: orderModule,
    technicial: technicialModule,
  },
});

export default store;
