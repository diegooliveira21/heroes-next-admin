import React, { ReactElement } from 'react';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import HSSnackbar from '@components/hs-snackbar/hs-snackbar.component';
import { GlobalContext, makeGlobalContext } from '@contexts/global.context';

function MyApp({
  Component, pageProps,
}: AppProps): ReactElement {
  const globalContext = makeGlobalContext();
  return (
    <GlobalContext.Provider value={globalContext}>
      <Component {...pageProps} />
      <HSSnackbar />
    </GlobalContext.Provider>
  );
}

export default MyApp;
