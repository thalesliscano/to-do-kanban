import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'; // Certifique-se de que o store é importado depois do Vue

Vue.use(VueRouter); // Instale o Vue Router antes de usá-lo

import HomePage from "./views/Home.vue";
import LoginPage from "./views/Login.vue";
import CadastroPage from "./views/Cadastro.vue";
import UserPage from "./views/User/Main.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: CadastroPage
  },
  {
    path: "/user",
    name: "User",
    component: UserPage,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isUserLoggedIn) {
        next('/login');
      } else {
        next(); // Usuário autenticado, prosseguir para a rota
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
