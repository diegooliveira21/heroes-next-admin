import { createContext } from 'react';
import { UseSnackbar } from '@components/hs-snackbar/hs-snackbar.types';
import useSnackbar from '@components/hs-snackbar/hs-snackbar.hook';
import useUser from '@hooks/use-hs-user/use-hs-user';
import { UseUser } from '@hooks/use-hs-user/use-hs-user.types';

export interface GlobalContextType {
  snackbar: UseSnackbar;
  user: UseUser
}

export function makeInitialGlobalContext(): GlobalContextType {
  const snackbar = useSnackbar();
  const user = useUser(snackbar);

  return {
    snackbar,
    user,
  };
}

const initialValue: GlobalContextType = {
  snackbar: {
    data: {},
  },
  user: {
    data: {},
  },
};

export const GlobalContext = createContext(initialValue);
