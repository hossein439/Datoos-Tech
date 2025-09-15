import { onResponse, onResponseError } from '@/clients/http/instances/real/response.interceptor';
import { onRequest, onRequestError } from '@/clients/http/instances/real/request.interceptor';
import HttpClient from '@/clients/http/helpers/generator.helper';

const HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
};
const TIMEOUT = 2 * 60 * 1000;

export default new HttpClient({
  timeout: TIMEOUT,
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE}`,
  interceptors: [{ onResponse, onResponseError, onRequest, onRequestError }],
  headers: HEADERS,
}).getInstance();
