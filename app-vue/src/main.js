import Vue from 'vue';
import App from './App.vue';
import store from './store'; // Certifique-se de que a store é importada corretamente
import router from './router'; // Se estiver usando Vue Router

Vue.config.productionTip = false;

new Vue({
  store, // Injete a store
  router, // Injete o router
  render: h => h(App),
}).$mount('#app');
