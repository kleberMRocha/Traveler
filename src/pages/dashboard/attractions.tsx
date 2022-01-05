import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { FiCoffee } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import styles from '../../../styles/components/DashboardPlaces.module.css';
import { NavManeger } from '../../components/shared/navManegerDashborad';
import TableInfos from '../../components/shared/table';
import api from '../../services/axios';


const PlaceDashboard:React.FC = () => {
  const [attractions,setAttractions] = useState([]);

  useEffect(() => {
    api.get('attractions').then(res => {
    setAttractions(res.data);
    })
  },[]);

  console.log(attractions);

  return (
    <section className={styles.container}>
      <ToastContainer />
      <h2><FiCoffee /> Gerenciar Eventos</h2>
      <NavManeger handleUpade={() => {}} pageName="attractions" /> 
      <TableInfos info={attractions} type="attacttion"  />
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
