import axios, { AxiosError, AxiosInstance } from 'axios';
import { getSessionToken, getXsrfToken, removeTokens } from './authUtils';

export type ApiResponse<T = unknown> = {
  message: string;
  data?: T;
  error?: string;
};

const api: AxiosInstance = axios.create({
  baseURL: '/api/v1/',
  timeout: 5000,
  withCredentials: true,
});

export function handleAxiosError(error: unknown, defaultMessage: string): ApiResponse {
  const axiosError = error as AxiosError;
  return {
    message: defaultMessage,
    error: axiosError.response?.data?.error || axiosError.message,
  };
}

const unauthorizedCallbacks: Array<() => void> = [];

export function onUnauthorized(callback: () => void): () => void {
  unauthorizedCallbacks.push(callback);
  return () => {
    const index = unauthorizedCallbacks.indexOf(callback);
    if (index > -1) unauthorizedCallbacks.splice(index, 1);
  };
}

api.interceptors.request.use(
  (originalConfig) => {
    const config = { ...originalConfig };

    const token = getSessionToken();
    if (token) {
      config.headers.Authorization = token;
    }

    const xsrfToken = getXsrfToken();
    config.headers['X-XSRF-TOKEN'] = xsrfToken;

    return config;
  },
  (error) => {
    return Promise.reject(handleAxiosError(error, 'Request Error'));
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      unauthorizedCallbacks.forEach((callback) => callback());
      removeTokens();
    }
    return Promise.reject(handleAxiosError(error, 'Response Error'));
  }
);

export default api;
