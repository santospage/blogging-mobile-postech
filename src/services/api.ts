import axios from 'axios';
import { BASE_URL } from '@env';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

export default api;
