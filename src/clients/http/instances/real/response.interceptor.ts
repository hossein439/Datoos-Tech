import { toast } from 'sonner';
import type { AxiosError, AxiosResponse } from 'axios';

const onResponseError = (error: AxiosError) => {
  const config = error.config as { isShowNotify?: boolean };
  const isShowNotify = config?.isShowNotify ?? false;

  if (!error.response) {
    // toast({
    //   message: 'عدم ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.',
    //   type: 'error',
    // });
    return Promise.reject({
      success: false,
      status: null,
      data: null,
      statusText: error.message,
    });
  }

  const { status, data, statusText } = error.response;
  const payload = { success: false, status, data, statusText };

  if (isShowNotify) {
    const errors = data?.Errors;
    const message = data?.Message;
    if (errors && typeof errors === 'object') {
      for (const key in errors) {
        if (Array.isArray(errors[key])) {
          //   errors[key].forEach((err: string) => toast({ message: err, type: 'error' }));
        }
      }
    } else if (message) {
      //   toast({ message, type: 'error' });
    }
  }

  switch (status) {
    case 401:
      //   handleRefreshToken(error);
      break;

    case 404:
      //   toast({
      //     message: data?.Message ?? 'درخواست مورد نظر یافت نشد',
      //     type: 'error',
      //   });
      break;

    case 400:
    case 403:
    case 409:
      //   toast({
      //     message: 'خطایی رخ داده است',
      //     type: 'error',
      //   });
      break;

    case 500:
      console.warn('خطای داخلی سرور', data);
      //   toast({
      //     message: 'خطایی در سامانه به وجود آمده است.',
      //     type: 'error',
      //   });
      break;

    case 502:
      //   toast({
      //     message: 'لطفاً صفحه را دوباره بارگذاری کنید یا بعداً تلاش نمایید.',
      //     type: 'error',
      //   });
      break;
  }

  return Promise.reject(payload);
};

const onResponse = (response: AxiosResponse) => {
  const config = response.config as { isShowNotify?: boolean };
  const isShowNotify = config.isShowNotify ?? false;
  const message = response?.data?.message;

  if (isShowNotify && message) {
    toast(message, {
      duration: 3000,
      className: 'rounded-x-sm !bg-inverse-surface text-error-container py-[14px] px-[16px]',
    });
  }
  return Promise.resolve({
    success: true,
    status: response.status,
    data: response.data,
    statusText: response.statusText,
  });
};

export { onResponse, onResponseError };
