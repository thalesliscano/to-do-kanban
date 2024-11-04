  <template lang="pug">
    section.login
        h1  Login
        form
            div.container
              label(for="email") User
              input(type="email" name="email" id="email" v-model="loginForm.email")
            div.container
              label(for="senha") Password
              input(type="password" name="senha" id="senha" v-model="loginForm.senha")
            <router-link to="/cadastro">Register here!</router-link> 
            button(class="btn" @click.prevent="logar") Logar
    </template>
    
    <script>
    import { mapActions } from 'vuex';
    
    export default {
      name: 'LoginPage',
      data() {
        return {
          loginForm: {
            email: '',
            senha: ''
          }
        };
      },
      methods: {
        ...mapActions(['login']), // Mapeia a ação de login
    
        logar() {
          console.log("Oi");
          const { email, senha } = this.loginForm;
          console.log(email, senha);
          this.login({ email, senha }) // Chamando a ação de login mapeada
            .then(response => {
              console.log('Login bem-sucedido', response);
              this.$router.push('/user');
            })
            .catch(error => {
              console.error('Erro ao fazer login', error.response ? error.response.data : error.message);
            });
        }
      }
    };
    </script>
    
    <style lang="scss" scoped>
    .login {
        display: flex;
        flex-direction: column;
        width: 300px;
        height: 300px;
        margin-top: 100px;
        justify-content: center;
        margin: 0 auto;
        padding: 20px;
        border-radius: 10px;
        background-color: #30ABD3;
        h1 {
            text-align: center;
            margin-bottom: 10px;
            color: #fff;
            font-weight: bold;
            font-size: 35px;
        }
        form {
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            .container {
                display: flex;
                flex-direction: column;
                margin-bottom: 10px;
            }
            input {
                width: 250px;
                height: 30px;
                border-radius: 50px;
                border: 2px solid #fff;
                color: #000;
                font-weight: bold;
                text-align: center;
                margin: 5px 0;
                &:active {
                    background: rgba($color: #000000, $alpha: 0.8);
                }
                &:focus {
                    border: 2px solid #000;
                    background: rgba($color: #000000, $alpha: 0.02);
                    outline: none;
                }
            }
            label {
                text-transform: capitalize;
                font-weight: 600;
                color: #fff;
            }
            button {
                align-self: flex-end;
                padding: 6px;
                width: 60px;
                margin-right: 10px;
                background: #fff;
                border: none;
                border-radius: 50px;
                color: #30ABD3;
                cursor: pointer;
                font-weight: bold;
            }
        }
    }
    </style>
    