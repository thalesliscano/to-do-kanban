import axios from 'axios';
import store from './store'; // Certifique-se de que isso está correto

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

axiosInstance.interceptors.request.use(config => {
  const token = store.getters.getToken; // Obtém o token da store
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const api = {
  // outros métodos...
  login(username, password) {
    return axiosInstance.post('/login', { username, password })
      .then(response => {
        const token = response.data.token;
        if (token) {
          store.commit('SET_TOKEN', token); // Salva o token na store
        }
        return response;
      })
      .catch(error => {
        console.error("Erro ao fazer login:", error);
        throw error;
      });
  },
};
