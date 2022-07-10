import {
  getDatabase, ref, onValue, update,
} from 'firebase/database';

export default {
  state: {
    info: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
      localStorage.setItem('user', JSON.stringify(info));
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
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateInfo({ dispatch, commit }, newInfo) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const updateInfo = {
          ...this.getters.info,
          ...newInfo,
        };
        const updates = {};
        updates[`users/${uid}/info`] = updateInfo;
        await update(ref(db), updates);
        commit('setInfo', updateInfo);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
  getters: {
    info: (state) => state.info,
  },
};
