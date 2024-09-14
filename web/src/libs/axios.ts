import axios from 'axios';

import { env } from '../env';

export const httpClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
});

httpClient.interceptors.response.use(async response => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return response;
});
