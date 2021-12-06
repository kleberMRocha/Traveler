import React from 'react';
import { FiCoffee } from 'react-icons/fi';
import styles from '../../../styles/components/DashboardPlaces.module.css';
import { NavManeger } from '../../components/shared/navManegerDashborad';

const PlaceDashboard = () => {
  return (
    <section className={styles.container}>
      <h2><FiCoffee /> Gerenciar Eventos</h2>
      <NavManeger />
    </section>
  );
};

export default PlaceDashboard;
