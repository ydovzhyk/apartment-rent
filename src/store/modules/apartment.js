import {
  createApartment,
  getApartmentsFilterList,
  getApartmentByIdData,
  checkAvailabilityAxios,
} from "../../services/apartments.service";

const initialState = {
  apartments: [],
  totalPage: 1,
  currentPage: 1,
  apartment: null,
  availability: {
    status: false,
    сhecked: false,
    dateFrom: null,
    dateTo: null,
    numberRooms: null,
    numberAdults: null,
    numberChildren: null,
    apartmentId: null,
  },
  message: null,
};

export default {
  namespaced: true,
  state: { ...initialState },
  mutations: {
    setMessage(state, data) {
      state.message = data.message;
    },
    clearMessage(state) {
      state.message = null;
    },
    setApartmentsData(state, { apartments, totalPages, currentPage }) {
      state.apartments = apartments;
      state.totalPage = totalPages;
      state.currentPage = currentPage;
    },
    setApartmentData(state, data) {
      state.apartment = data;
    },
    clearApartmentData(state) {
      Object.assign(state, { ...initialState });
    },
    clearApartment(state) {
      state.apartment = null;
    },
    setAvailability(state, data) {
      state.availability.status = data.status;
      state.availability.сhecked = true;
      state.availability.dateFrom = data.dateFrom;
      state.availability.dateTo = data.dateTo;
      state.availability.numberRooms = data.numberRooms;
      state.availability.numberAdults = data.numberAdults;
      state.availability.numberChildren = data.numberChildren;
      state.availability.apartmentId = data.apartmentId;
    },
    clearAvailability(state) {
      state.availability = {
        status: false,
        сhecked: false,
        dateFrom: null,
        dateTo: null,
        numberRooms: null,
        numberAdults: null,
        numberChildren: null,
        apartmentId: null,
      };
    },
  },
  actions: {
    async apartmentCreate({ commit }, payload) {
      const { data } = await createApartment(payload);
      commit("setMessage", data);
    },
    async getApartmentsListData({ commit }, payload) {
      const { data } = await getApartmentsFilterList(payload);
      commit("setApartmentsData", data);
    },
    async getApartmentById({ commit }, payload) {
      const { data } = await getApartmentByIdData(payload);
      commit("setApartmentData", data);
    },
    async checkAvailability({ commit }, payload) {
      const { data } = await checkAvailabilityAxios(payload);
      commit("setAvailability", data);
    },
  },
};
