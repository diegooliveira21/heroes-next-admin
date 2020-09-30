import Head from 'next/head';
import { Button } from '@material-ui/core';
import useHSRouters from '@hooks/use-hs-routers/use-hs-routers';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { pushToDashboard } = useHSRouters();

  return (
    <div className={styles.container}>
      <Head>
        <title>Heroes Association</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Button onClick={pushToDashboard}>Ir para o Dashboard</Button>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          {' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
