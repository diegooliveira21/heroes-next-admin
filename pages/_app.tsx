import React, { ReactElement } from 'react';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import HSDrawerMenu from '../components/hs-drawer-menu/hs-drawer-menu.component';

function MyApp({
  Component, pageProps,
}: AppProps): ReactElement {
  return (
    <HSDrawerMenu>
      <Component {...pageProps} />
    </HSDrawerMenu>
  );
}

export default MyApp;
