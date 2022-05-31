import { getDatabase, ref, onValue } from 'firebase/database';

export default {
  state: {
    info: null,
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = null;
    },
  },
  actions: {
    async fetchUserInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        await onValue(
          ref(db, `users/${uid}/info`),
          (snapshot) => {
            commit('setInfo', snapshot.val());
          },
          { onlyOnce: true },
        );
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
  },
  getters: {
    info: (state) => state.info,
  },
};
