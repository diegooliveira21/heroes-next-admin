import React, { ReactElement } from 'react';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import HSSnackbar from '@components/hs-snackbar/hs-snackbar.component';
import AuthProvider from '../providers/auth/auth.provider';

function MyApp({
  Component, pageProps,
}: AppProps): ReactElement {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <HSSnackbar />
    </>
  );
}

export default MyApp;
