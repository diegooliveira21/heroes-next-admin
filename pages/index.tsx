import React, { ReactElement } from 'react';
import { Box, Grid } from '@material-ui/core';
import HSSignInForm from '@components/hs-sign-in-form/hs-sign-in-form.component';

export default function Home(): ReactElement {
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
