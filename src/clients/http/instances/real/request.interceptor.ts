import type { InternalAxiosRequestConfig, AxiosError } from 'axios';
import cookie from '@/lib/cookie.lib';

const onRequestError = (error: AxiosError): Promise<never> => {
  return Promise.reject(error);
};

const setTokenInHeaders = (config: InternalAxiosRequestConfig): void => {
  const token = cookie.get('token') || '';
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
};

const onRequest = (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  setTokenInHeaders(config);
  return Promise.resolve(config);
};

export { onRequest, onRequestError };
