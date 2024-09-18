import axios from 'axios';
// TO DO: Importa tu configuración de ambiente si tienes una URL base
// TO DO: Traer la url desde las ariables de ambiente
import { environment } from '../environments/environment';

const neatAxiosClient = axios.create({
  baseURL: 'http://127.0.0.1:5001/neat-crypto-exchange/us-central1/function/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

neatAxiosClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function getToken(): Promise<string | null> {
  const user = await import('firebase/auth').then((firebase) => firebase.getAuth().currentUser);
  return user ? user.getIdToken() : null;
}

export default neatAxiosClient;
