import {
  getDatabase, ref, push, get, child, update,
} from 'firebase/database';

export default {
  state: {
    categories: [],
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    clearCategories(state) {
      state.categories = [];
    },
  },
  actions: {
    async getCategories({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const dbRef = ref(getDatabase());
        const categories = await get(child(dbRef, `users/${uid}/categories`))
          .then((snapshot) => snapshot.val());
        if (categories) {
          commit(
            'setCategories',
            Object.keys(categories)
              .map((key) => ({ ...categories[key], id: key })),
          );
        }
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async createCategory({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const category = await
        push(ref(db, `users/${uid}/categories`), { title, limit });
        await dispatch('getCategories');
        return { title, limit, id: category.key };
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateCategory({ dispatch, commit }, { id, title, limit }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const updates = {};
        updates[`users/${uid}/categories/${id}`] = { title, limit };
        await update(ref(db), updates);
        await dispatch('getCategories');
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
  getters: {
    categories: (state) => state.categories,
  },
};
