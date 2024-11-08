import Vue from 'vue';
import Vuex from 'vuex';
import { api } from './services';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      isLoggedIn: false,
      username: '',
      token: null
    }
  },
  mutations: {
    LOGIN(state, { username, token }) {
      state.auth.isLoggedIn = true;
      state.auth.username = username;
      state.auth.token = token;
    },
    LOGOUT(state) {
      state.auth.isLoggedIn = false;
      state.auth.username = '';
      state.auth.token = null;
    },
    SET_TOKEN(state, token) {
      state.auth.token = token;
    }
  },
  actions: {
    async login({ commit }, { email, senha }) {
      try {
        const response = await api.login(email, senha); // Faz uma requisição real de login
        const token = response.data.token;
        if (token) {
          commit('LOGIN', { username: email, token });
        }
        return response;
      } catch (error) {
        throw new Error("Falha na autenticação");
      }
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('LOGOUT');
        resolve();
      });
    }
  },
  getters: {
    isUserLoggedIn(state) {
      return state.auth.isLoggedIn;
    },
    getToken(state) {
      return state.auth.token;
    }
  }
});
