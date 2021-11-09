import React from 'react';
import style from '../../../styles/components/Places.module.css';
import { ICardProps } from '../../context/types';
import Link from 'next/link';
import { FaCoffee, FaStar } from 'react-icons/fa';

const Card: React.FC<ICardProps> = ({
  id,
  available_location,
  location,
  picture,
  isTopAvaliation,
  children,
}) => {
  return (
    <>
      <Link href={`/${isTopAvaliation ? 'turism' : 'location'}/${id}`}>
        <a>
        {
          isTopAvaliation && 
          <div className={style.topAvaliations}>
            <div>
              <FaStar />
            </div>
            <small>5.0</small>
         </div>
        }
          <div
            key={`${location}-${id}`}
            className={style.location}
            style={{ background: `url(${picture})` }}
          >
            <div className={style.container }>
              <span style={{display:`${isTopAvaliation ? 'none' : ''}`}}>
                <h3> {location} </h3>
                <small>{available_location} locais</small>
              </span>
              <span className={style.topInfos} style={{display:`${isTopAvaliation ? '' : 'none'}`}}>
                <h3> Doce Companhia </h3>
                <hr />
                <small>Comida e Bebida <FaCoffee /></small>
              </span>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

export default Card;
