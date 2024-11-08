<template>
  <nav class="navbar">
    <ul class="left">
      <li class="logo"><router-link to="/"></router-link></li>
    </ul>
    <ul class="right">
      <template v-if="isLoggedIn">
        <li class="user">{{ username }}</li>
        <li class="logout" @click="logout">Logout</li>
      </template>
      <template v-else>
        <li class="login"><router-link to="/login">Sign in</router-link></li>
        <li class="cadastro"><router-link to="/cadastro">Sign up</router-link></li>
      </template>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "NavBar",
  computed: {
    ...mapState({
      isLoggedIn: state => state.auth.isLoggedIn,
      username: state => state.auth.username
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('logout') // Chame a ação de logout diretamente
        .then(() => {
          this.$router.push('/'); // Redireciona para a página inicial
        })
        .catch(error => {
          console.error("Logout error:", error);
        });
    }
  }
};
</script>


<style scoped>
.navbar {
  display: flex;
  justify-content: space-between; /* Espaçamento entre os grupos de links */
  background-color: #fff;
  padding: 10px;
}

.left, .right {
  list-style-type: none; /* Remove os marcadores da lista */
  padding: 20px; /* Remove o preenchimento */
  margin: 0; /* Remove a margem */
}

.left {
  background-color: #30ABD3;
  border-radius: 30px;
}
.left .logo {
  width: 50px;
  height: 50px;
}

.left li, .right li {
  display: inline; /* Os itens da lista serão exibidos em linha */
  margin-right: 20px; /* Espaçamento entre os itens */
}

.right .login {
  padding: 10px;
  border-radius: 50px;
  border: 1px solid #30ABD3;
}
.right .login a {
  color: #30ABD3;
  text-decoration: none;
}

.right .cadastro {
  padding: 10px;
  border-radius: 50px;
  border: 1px solid #30ABD3;
  background-color: #30ABD3;
}
.right .cadastro a {
  text-decoration: none;
  color: #fff;
}

.navbar a {
  color: white;
  text-decoration: none;
}

.navbar a:hover {
  text-decoration: underline;
}

.user {
  padding: 10px;
  color: #30ABD3; /* Cor do nome do usuário */
}

.logout {
  cursor: pointer;
  padding: 10px;
  border-radius: 50px;
  border: 1px solid #30ABD3;
  color: #30ABD3; /* Cor do botão de logout */
}
</style>
