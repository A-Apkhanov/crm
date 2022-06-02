export default {
  state: {
    exchangeRates: null,
  },
  mutations: {
    setExchangeRates(state, exchangeRates) {
      state.exchangeRates = exchangeRates;
    },
    clearExchangeRates(state) {
      state.exchangeRates = null;
    },
  },
  actions: {
    async fetchExchangeRates({ commit }) {
      try {
        const myHeaders = new Headers();
        myHeaders.append('apikey', process.env.VUE_APP_FIXER_API_KEY);
        const requestOptions = {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders,
        };
        const res = await fetch(
          'https://api.apilayer.com/fixer/latest?symbols=RUB%2CEUR%2C%20USD&base=RUB',
          requestOptions,
        );
        const data = await res.json();

        commit('setExchangeRates', data);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
  },
  getters: {
    exchangeRates: (state) => state.exchangeRates,
  },
};
