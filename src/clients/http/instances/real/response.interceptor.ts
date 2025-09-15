import { toast } from 'sonner';
import type { AxiosError, AxiosResponse } from 'axios';

const onResponseError = (error: AxiosError) => {
  if (!error.response) {
    return Promise.reject({
      success: false,
      status: null,
      data: null,
      statusText: error.message,
    });
  }

  const { status, data, statusText } = error.response;
  const payload = { success: false, status, data, statusText };

  return Promise.reject(payload);
};

const onResponse = (response: AxiosResponse) => {
  const config = response.config as { isShowNotify?: boolean };

  return Promise.resolve({
    success: true,
    status: response.status,
    data: response.data,
    statusText: response.statusText,
  });
};

export { onResponse, onResponseError };
