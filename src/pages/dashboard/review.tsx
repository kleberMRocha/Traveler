import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import styles from '../../../styles/components/DashboardPlaces.module.css';
import { NavManeger } from '../../components/shared/navManegerDashborad';

const PlaceDashboard = () => {
  return (
    <section className={styles.container}>
      <ToastContainer />
      <h2><FiUser /> Gerenciar Reviews</h2>
      <NavManeger handleUpade={() => {}} pageName="review" />
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { traveller_token } = parseCookies(ctx);
  
  if (!traveller_token){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: { },
    };
  }
  
  return { props: {} };
}

export default PlaceDashboard;