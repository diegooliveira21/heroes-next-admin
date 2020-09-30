import React, { ReactElement } from 'react';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import HSSnackbar from '@components/hs-snackbar/hs-snackbar.component';
import { GlobalContext, makeInitialGlobalContext } from '@contexts/global.context';

function MyApp({
  Component, pageProps,
}: AppProps): ReactElement {
  return (
    <GlobalContext.Provider value={makeInitialGlobalContext()}>
      <Component {...pageProps} />
      <HSSnackbar />
    </GlobalContext.Provider>
  );
}

export default MyApp;
