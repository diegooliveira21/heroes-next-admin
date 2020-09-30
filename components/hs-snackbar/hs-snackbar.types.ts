import { SnackbarOrigin, SnackbarProps } from '@material-ui/core';

export interface SnackbarData {
  open: SnackbarProps['open'];
  message: string;
  vertical: SnackbarOrigin['vertical'];
  horizontal: SnackbarOrigin['horizontal'];
}

export interface UseSnackbar {
  data: SnackbarData;
  openSnackbar: (message: SnackbarData['message']) => void;
  closeSnackbar: () => void;
}
