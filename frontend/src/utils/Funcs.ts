import axios, { AxiosRequestConfig } from 'axios';
import { IDataAxiosResponse } from './Interfaces';

export function getApiBaseUrl() {
  return process.env.REACT_APP_API_END_POINT || 'http://localhost:3001/api';
}

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
});

const wrapSuccess = (res: { data: any }): IDataAxiosResponse => {
  const body = res.data;
  if (body && typeof body === 'object' && 'success' in body) {
    return {
      success: body.success,
      result: body.result,
      message: body.message,
      error: body.error,
      total: body.total,
    };
  }
  return {
    success: true,
    result: body,
    message: body?.message,
  };
};

const wrapError = (err: any): IDataAxiosResponse => {
  const raw = err?.response?.data?.message;
  const message = Array.isArray(raw) ? raw.join(', ') : raw;
  return {
    success: false,
    error: err,
    message,
  };
};

class Funcs {
  static fun_log = (value: any, file?: any, line?: number) => {
    if (String(process.env.REACT_APP_DEBUG_MODE) === 'TRUE') {
      console.group(`File: ${file || 'Other Logs'}, Line: ${line || 'NULL'}`);
      console.log(value);
      console.groupEnd();
    }
  };

  static fun_getSuccessAxiosResponse = wrapSuccess;
  static fun_getErrorAxiosResponse = wrapError;

  static fun_get = async (url: string, config?: AxiosRequestConfig): Promise<IDataAxiosResponse> => {
    try {
      return wrapSuccess(await apiClient.get(url, config));
    } catch (err) {
      return wrapError(err);
    }
  };

  static fun_post = async (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<IDataAxiosResponse> => {
    try {
      return wrapSuccess(await apiClient.post(url, data, config));
    } catch (err) {
      return wrapError(err);
    }
  };

  static fun_put = async (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<IDataAxiosResponse> => {
    try {
      return wrapSuccess(await apiClient.put(url, data, config));
    } catch (err) {
      return wrapError(err);
    }
  };

  static fun_delete = async (url: string, config?: AxiosRequestConfig): Promise<IDataAxiosResponse> => {
    try {
      return wrapSuccess(await apiClient.delete(url, config));
    } catch (err) {
      return wrapError(err);
    }
  };
}

export default Funcs;
