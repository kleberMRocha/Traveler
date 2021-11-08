import React from 'react';
import style from '../../styles/SearchPlaces.module.css';
import { usePlaces } from '../context/usePlaces';
import Card from '../components/shared/Card';
import { Filter } from '../components/Filter';
import Head  from 'next/head'

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

export default AllPlaces;
