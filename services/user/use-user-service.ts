import { useMemo } from 'react';
import useAxios from '../axios/use-axios';
import { UserData, UseUserService } from './use-user-service.types';

function useUserService(): UseUserService {
  const axios = useAxios();

  async function fetchUserRegister(userData: UserData) {
    return axios.post('user/register', userData)
      .then((response) => response.data.body)
      .catch(() => {
        throw Error();
      });
  }

  async function fetchUserAuthenticate(userData: UserData) {
    return axios.post('user/authenticate', userData)
      .then((response) => response.data.body)
      .catch(() => {
        throw Error();
      });
  }

  return useMemo(() => ({
    fetchUserRegister,
    fetchUserAuthenticate,
  }), []);
}

export default useUserService;
