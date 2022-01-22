import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../context/useAuth';
import { parseCookies } from 'nookies';
import { ChartDash } from '../components/Dashboard/Chart';
import { CardDashboard } from '../components/Dashboard/Card';

import styleDash from '../../styles/Dashboard.module.css';
import api from '../services/axios';
import LoaderPage from '../components/shared/LoaderPage';

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  type ICardData = {
    value: number;
  };

  const [cards, setCards] = useState([] as ICardData[]);
  const [charts, setChart] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const greetings = localStorage.getItem('@greetings');
    if (user.firstName && !greetings) {
      toast.success(`${user.firstName} - Boas Vindas 😀`);
      localStorage.setItem('@greetings', JSON.stringify(true));
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    api.get('dashboard').then((res) => {
        setCards(res.data.cards);
        setChart(res.data.chart)
    })
    .catch(err => console.log(err))
    .finally(() => setLoading(false))

  }, []);

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Head>
        <title> Home | Traveler</title>
        <meta name="description" content="Generated by create next app" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.mainContent}>
        <h1>Traveler | Dashboard</h1>
        <div className={styleDash.containerCard}>
          {!isLoading ? (
            cards.map((c, index) => {
              const key = Object.keys(c)[0];
              return <CardDashboard infos={c as any} key={`card-${index}-${key}`} />;
            })
          ) : (
            <LoaderPage />
          )}
        </div>
        <div className={styleDash.containerChart}>
          {!isLoading ? (
            <>
              <ChartDash infos={charts as any}  type='att0'/>
              <ChartDash infos={charts as any}  type='att1'/>
            </>
          ) : (
            <LoaderPage />
          )}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { traveller_token } = parseCookies(ctx);
  if (!traveller_token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {},
    };
  }

  return { props: {} };
};

export default Dashboard;
