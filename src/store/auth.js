import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

export default {
  actions: {
    async getUid() {
      const auth = getAuth();
      const user = auth.currentUser;
      return await user ? user.uid : null;
    },
    async login({ commit }, { email, password }) {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      const auth = getAuth();
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = await dispatch('getUid');
        const db = getDatabase();
        await set(ref(db, `users/${uid}/info`), {
          bill: 100000,
          name,
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async logout({ commit }) {
      const auth = getAuth();
      await signOut(auth);
      commit('clearInfo');
    },
  },
};
