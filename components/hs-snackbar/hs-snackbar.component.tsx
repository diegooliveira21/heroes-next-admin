import React, { ReactElement, useContext } from 'react';
import { Snackbar } from '@material-ui/core';
import { GlobalContext } from '@contexts/global.context';

function HSSnackbar(): ReactElement {
  const {
    snackbar: {
      data: {
        open,
        message,
        vertical,
        horizontal,
      },
      closeSnackbar,
    },
  } = useContext(GlobalContext);

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={closeSnackbar}
      message={message}
      key={vertical + horizontal}
    />
  );
}

export default HSSnackbar;
