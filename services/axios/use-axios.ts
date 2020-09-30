import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useCallback } from 'react';

function useAxios(headers?: AxiosRequestConfig): AxiosInstance {
  const baseURL = '/api/';

  const axiosInstance = axios.create({
    baseURL,
    headers,
  });

  return useCallback(axiosInstance, [headers]);
}

export default useAxios;
