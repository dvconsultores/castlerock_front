import axios from 'axios';
import { App } from 'vue';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default {
  install(app: App) {
    app.config.globalProperties.$axios = axiosInstance;
    app.provide('axios', axiosInstance);
  },
};