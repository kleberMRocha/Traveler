import React, { useEffect } from 'react';
import { usePlaces } from '../context/usePlaces';
import style from '../../styles/SearchPlaces.module.css';
import Card from '../components/shared/Card';
import { Filter } from '../components/Filter';

const AllPlaces: React.FC = () => {
  const { places, sortPlacesBy } = usePlaces();
 
  return (
    <section className={style.galery}>
      <div className={style.headerSection}><h2> Selecione uma cidade </h2> <Filter /></div>
      <div className={style.placesContainer}>
        {places.map((p) => (<Card {...p} key={p.id} />))}
      </div>
    </section>
  );
};

export default AllPlaces;
