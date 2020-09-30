import React, { ReactElement, useContext, useEffect } from 'react';
import {
  Box,
  Grid,
} from '@material-ui/core';
import HSSignInForm from '@components/hs-sign-in-form/hs-sign-in-form.component';
import { GlobalContext } from '@contexts/global.context';
import useHSRouters from '@hooks/use-hs-routers/use-hs-routers';

function SignInPage(): ReactElement {
  const {
    user: {
      data: {
        isLogged,
      },
    },
  } = useContext(GlobalContext);

  const {
    pushToDashboard,
  } = useHSRouters();

  useEffect(() => {
    if (isLogged) pushToDashboard();
  }, [isLogged]);

  return (
    <Box minHeight="100vh" alignItems="center" display="flex">
      <Grid container justify="center">
        <Grid item xs={5}>
          <HSSignInForm />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignInPage;
