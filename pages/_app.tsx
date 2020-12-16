import React, { ReactElement } from 'react';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import AuthProvider from '@providers/auth/auth.provider';
import ToastProvider from '@providers/toast/toast.provider';
import 'bootstrap/dist/css/bootstrap.min.css';
import theme from '../theme/theme';

function MyApp({
  Component, pageProps,
}: AppProps): ReactElement {
  return (
    <ThemeProvider theme={theme.light}>
      <ToastProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default MyApp;
