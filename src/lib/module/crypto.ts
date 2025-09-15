import CryptoService from '@/service/crypto';
import axios from 'axios';

export async function fetchCryptos(params) {
  const data = await axios.get('/api/crypto', {
    params,
  });
  return data.data;
}
