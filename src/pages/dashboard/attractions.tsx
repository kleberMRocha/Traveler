import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { FiCoffee } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import styles from '../../../styles/components/DashboardPlaces.module.css';
import LoaderPage from '../../components/shared/LoaderPage';
import { NavManeger } from '../../components/shared/navManegerDashborad';
import TableInfos from '../../components/shared/table';
import api from '../../services/axios';


const PlaceDashboard:React.FC = () => {
  const [attractions,setAttractions] = useState([]);
  const [isLoading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('attractions')
    .then(res => {setAttractions(res.data); })
    .finally(() => setLoading(false))

  },[]);

  return (
    <section className={styles.container}>
      <ToastContainer />
      <h2><FiCoffee /> Gerenciar Eventos</h2>
      <NavManeger handleUpade={setAttractions} pageName="attractions" /> 
      <section className={styles.tableSection} id="table">
        {
          isLoading
          ? <LoaderPage />
          :   <TableInfos info={attractions} type="attacttion"  />
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
  
  return { props: {} };

}

export default PlaceDashboard;
