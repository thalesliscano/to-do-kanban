import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      isLoggedIn: false,
      username: ''
    }
  },
  mutations: {
    LOGIN(state, username) {
      state.auth.isLoggedIn = true;
      state.auth.username = username;
    },
    LOGOUT(state) {
      state.auth.isLoggedIn = false;
      state.auth.username = '';
    }
  },
  actions: {
    login({ commit }, email) {
      // Simulação de uma lógica de autenticação
      commit('LOGIN', email); // Passando o email para o estado
    },
    logout({ commit }) {
      commit('LOGOUT');
    }
  },
  getters: {
    isUserLoggedIn(state) {
      return state.auth.isLoggedIn;
    }
  }
});
