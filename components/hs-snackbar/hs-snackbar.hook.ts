import { useMemo, useState } from 'react';
import { SnackbarData, UseSnackbar } from '@components/hs-snackbar/hs-snackbar.types';

function useSnackbar(): UseSnackbar {
  const initialState: SnackbarData = {
    open: false,
    message: '',
    vertical: 'top',
    horizontal: 'center',
  };

  const [data, setSnackbarData] = useState<SnackbarData>(initialState);

  function openSnackbar(message: string) {
    return setSnackbarData(prevState => ({
      ...prevState,
      open: true,
      message,
    }));
  }

  function closeSnackbar() {
    return setSnackbarData(initialState);
  }

  return useMemo(() => ({
    data,
    openSnackbar,
    closeSnackbar,
  }), [
    data,
    setSnackbarData,
    openSnackbar,
    closeSnackbar,
  ]);
}

export default useSnackbar;
