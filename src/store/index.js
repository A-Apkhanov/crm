import { createStore } from 'vuex';
import auth from './auth';
import userInfo from './userInfo';
import exchangeRates from './exchangeRates';
import category from './category';

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: (state) => state.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
  },
  modules: {
    auth, userInfo, exchangeRates, category,
  },
});
