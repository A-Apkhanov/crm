import { getDatabase, ref, push } from 'firebase/database';

export default {
  actions: {
    async createRecord({ dispatch, commit }, data) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        return await push(ref(db, `users/${uid}/records`), data);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
