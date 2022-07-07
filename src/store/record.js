import {
  getDatabase, ref, push, get, child,
} from 'firebase/database';

export default {
  state: {
    records: [],
  },
  mutations: {
    setRecords(state, records) {
      state.records = records;
    },
    clearRecords(state) {
      state.records = [];
    },
  },
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
    async getRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const dbRef = ref(getDatabase());
        const records = await get(child(dbRef, `users/${uid}/records/`))
          .then((snapshot) => snapshot.val());
        if (records) {
          commit(
            'setRecords',
            Object.keys(records)
              .map((key) => ({ ...records[key], id: key })),
          );
        }
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async getRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid');
        const dbRef = ref(getDatabase());
        const record = await get(child(dbRef, `users/${uid}/records/${id}`))
          .then((snapshot) => snapshot.val());
        return record ? { ...record, id } : null;
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
  getters: {
    records: (state) => state.records,
  },
};
