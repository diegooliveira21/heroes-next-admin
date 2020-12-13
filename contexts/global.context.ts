import { createContext } from 'react';
import { UseSnackbar } from '@components/hs-snackbar/hs-snackbar.types';
import useSnackbar from '@components/hs-snackbar/hs-snackbar.hook';
import useUser from '@hooks/use-hs-user/use-hs-user';
import { UseUser } from '@hooks/use-hs-user/use-hs-user.types';

export interface GlobalContextType {
  snackbar: UseSnackbar;
  user: UseUser;
}

export function makeGlobalContext(): GlobalContextType {
  const snackbar = useSnackbar();
  const user = useUser();

  return {
    snackbar,
    user,
  };
}

const initialValue: GlobalContextType = {
  snackbar: {
    data: {
      vertical: 'bottom',
      open: false,
      horizontal: 'center',
      message: '',
    },
    openSnackbar: () => null,
    closeSnackbar: () => null,
  },
  user: {
    data: {
      email: '',
      id: null,
      password: '',
      token: null,
    },
    isLoading: false,
  },
};

export const GlobalContext = createContext(initialValue);
