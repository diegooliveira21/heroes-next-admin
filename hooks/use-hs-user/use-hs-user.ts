import { useMemo, useState } from 'react';
import { UseUser, UseUserData } from '@hooks/use-hs-user/use-hs-user.types';
import useUserService from '@services/user/use-user-service';
import { UserData } from '@services/user/use-user-service.types';
import { UseSnackbar } from '@components/hs-snackbar/hs-snackbar.types';
import { UseUserEnum } from '@hooks/use-hs-user/use-hs-user.enums';

function useUser(snackbar: UseSnackbar): UseUser {
  const [data, setUserData] = useState<UseUserData>({
    id: null,
    isLogged: false,
    email: '',
    password: '',
  });

  const {
    fetchUserRegister,
    fetchUserAuthenticate,
  } = useUserService();

  const {
    openSnackbar,
  } = snackbar;

  function userRegister(userData: UserData) {
    return fetchUserRegister(userData)
      .then((response) => {
        openSnackbar(UseUserEnum.RegisterUserSuccess);
        setUserData(prevState => ({
          ...prevState,
          ...response,
          isLogged: true,
        }));
      })
      .catch(() => openSnackbar(UseUserEnum.RegisterUserFailed));
  }

  function userAuthenticate(userData: UserData) {
    return fetchUserAuthenticate(userData)
      .then((response) => {
        openSnackbar(UseUserEnum.LoginUserSuccess);
        setUserData(prevState => ({
          ...prevState,
          ...response,
          isLogged: true,
        }));
      })
      .catch(() => openSnackbar(UseUserEnum.LoginUserFailed));
  }

  return useMemo(() => ({
    data,
    userRegister,
    userAuthenticate,
  }), [
    data,
    setUserData,
    userRegister,
  ]);
}

export default useUser;
