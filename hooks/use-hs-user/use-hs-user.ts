import {
  useMemo,
  useState,
  useEffect,
} from 'react';
import { UseUser, UseUserData } from '@hooks/use-hs-user/use-hs-user.types';
import useUserService from '@services/user/use-user-service';
import { UserData } from '@services/user/use-user-service.types';
import { UseUserCommonEnum, UseUserSnackbarEnum } from '@hooks/use-hs-user/use-hs-user.enums';
import useSnackbar from '@components/hs-snackbar/hs-snackbar.hook';

function useUser(): UseUser {
  const localUserToken = localStorage.getItem(UseUserCommonEnum.Token);
  const [data, setUserData] = useState<UseUserData>({
    id: null,
    token: localUserToken,
    email: '',
    password: '',
  });

  const [
    isLoading,
    setIsLoading,
  ] = useState<boolean>(false);

  const {
    fetchUserRegister,
    fetchUserAuthenticate,
  } = useUserService();

  const {
    openSnackbar,
  } = useSnackbar();

  const handleSetUserData = (userData: UserData): void => (
    setUserData((prevState) => ({
      ...prevState,
      ...userData,
    }))
  );

  const userRegister = (userData: UserData): Promise<void> => {
    setIsLoading(true);
    return fetchUserRegister(userData)
      .then((response) => {
        openSnackbar(UseUserSnackbarEnum.RegisterUserSuccess);
        handleSetUserData(response);
      })
      .catch(() => openSnackbar(UseUserSnackbarEnum.RegisterUserFailed))
      .finally(() => setIsLoading(false));
  };

  const userAuthenticate = (userData: UserData): Promise<void> => {
    setIsLoading(true);
    return fetchUserAuthenticate(userData)
      .then((response) => {
        openSnackbar(UseUserSnackbarEnum.LoginUserSuccess);
        handleSetUserData(response);
      })
      .catch(() => openSnackbar(UseUserSnackbarEnum.LoginUserFailed))
      .finally(() => setIsLoading(false));
  };

  useEffect(
    () => {
      if (data.token) {
        localStorage.setItem(UseUserCommonEnum.Token, data.token);
        if (!data.id) userAuthenticate(data);
      }
    },
    [data.token],
  );

  return useMemo(() => ({
    data,
    isLoading,
    userRegister,
    userAuthenticate,
  }), [
    data,
    isLoading,
    setUserData,
    userRegister,
  ]);
}

export default useUser;
