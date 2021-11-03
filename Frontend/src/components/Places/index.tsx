import React from 'react';
import style from '../../../styles/components/Places.module.css';
import Card from '../shared/Card';
import {mock} from '../../../mock/mock';

const Places: React.FC = () => {
  

  return (
    <section className={style.places}>
      <div className={style.col}>
        {mock().map((p, index) => {
          return (
          <Card  {...p} key={index}/>
          );
        })}
      </div>
      <div className={style.col}>
        {mock().map((p, index) => {
          return (
            <div 
            key={`${p.location}-${index}`} 
            className={style.location}
            style={{background:`url(${p.picture})`}}
            
            >
              <div className={style.container}>
                <span>
                   <h3> {p.location} </h3>
                   <small>{p.available_location} locais</small>
                </span>
              
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Places;
