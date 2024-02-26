import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import {
  ApiConfig,
} from './config';

import { requestHandler } from '@/utils/requestHandler';
import { refreshToken } from '@/services/auth/requests';

import { deleteCookie, hasCookie, getCookie, setCookie } from 'cookies-next';

export const baseAPI: AxiosInstance = axios.create(ApiConfig);
export const basePrivateAPI: AxiosInstance = axios.create(ApiConfig);

const checkTokenInterceptor = (config: any) => {
  const token = getCookie('token',);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const responseSuccessInterceptor = (response: AxiosResponse) => {
  const data = response.data;

  return { data } as AxiosResponse;
};

const errorInterceptor = async (error: AxiosError) => {
  const responseError = error?.response?.data;

  if (error?.response?.status === 404) {
    throw { common: ["Oops... Something went wrong"] };
  }
  if (error?.response?.status === 500) {
    throw { common: ["Oops... Something went wrong"] };
  }

  if (responseError) {
    throw { ...responseError };
  } else {
    throw { common: [error.message] };
  }
};

const errorPrivateInterceptor = async (error: AxiosError) => {
  const responseError = error?.response?.data;
  const originalRequest: InternalAxiosRequestConfig<any> & { _retry?: boolean } | undefined = error.config;

  if (error?.response?.status === 401 && originalRequest && !originalRequest?._retry) {
    originalRequest._retry = true;

    const resp = await requestHandler(refreshToken());
    if (resp.error) {
      if (hasCookie("token")) {
        deleteCookie("token");
      }
      throw { common: [resp.error] };
    };

    setCookie("token", resp.data?.accessToken);
    return baseAPI(originalRequest as any);
  }

  if (error?.response?.status === 404) {
    throw { common: ["Oops... Something went wrong"] };
  }
  if (error?.response?.status === 500) {
    throw { common: ["Oops... Something went wrong"] };
  }

  if (responseError) {
    throw { ...responseError };
  } else {
    throw { common: [error.message] };
  }
};

basePrivateAPI.interceptors.request.use(checkTokenInterceptor);
basePrivateAPI.interceptors.response.use(responseSuccessInterceptor, errorPrivateInterceptor);
baseAPI.interceptors.response.use(responseSuccessInterceptor, errorInterceptor);