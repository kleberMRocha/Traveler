import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import styles from '../../../styles/components/DashboardPlaces.module.css';
import LoaderPage from '../../components/shared/LoaderPage';
import { NavManeger } from '../../components/shared/navManegerDashborad';
import api from '../../services/axios';
import TableInfos from '../../components/shared/table';

const PlaceDashboard:React.FC = (props) => {
    const [places,setPaces] = useState([]); 
    const [isLoading,setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      api.get(`${process.env.NEXT_PUBLIC_DOMAIN_API_NODE}places`)
        .then(res => { setPaces(res.data) })
        .finally(() => setLoading(false))
    },[]);

   const handleUpade = (value :[]) => {
    setPaces(value);
   }

  return (
    <section className={styles.container}>
      <ToastContainer />
      <h2><FiGlobe /> Gerenciar Lugares</h2>
      <NavManeger pageName="places"  handleUpade={handleUpade}/>
      <section className={styles.tableSection} id="table">
        {
          isLoading
          ? <LoaderPage />
          : <TableInfos info={places} type="places"  />
        }
      </section>
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
  
  return { props: {  } };

}

export default PlaceDashboard;
