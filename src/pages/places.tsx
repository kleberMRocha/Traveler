import React from 'react';
import style from '../../styles/SearchPlaces.module.css';
import { usePlaces } from '../context/usePlaces';
import Card from '../components/shared/Card';
import { Filter } from '../components/Filter';
import Head  from 'next/head'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

const AllPlaces: React.FC = () => {
  const { places, sortPlacesBy } = usePlaces();
 
  return (
    <section className={style.galery}>
       <Head>
        <title> Descobrir | Traveler</title>
      </Head>
      <div className={style.headerSection}><h2> Selecione uma cidade </h2> <Filter /></div>
      <div className={style.placesContainer}>
        {places.map((p) => (<Card {...p} key={p.id} />))}
        {places.length === 0 && <p className={style['info-search']}>
          Não conseguimos encontrar um lugar com esse nome 😕  
        </p>}
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {traveller_token} = parseCookies(ctx);
  if(!traveller_token) return { props: {} };

  const {token, user} = JSON.parse(traveller_token);
  
  return { redirect: {
    destination: '/dashboard',
    permanent: false,
  } ,props: { token, user } }
}


export default AllPlaces;
