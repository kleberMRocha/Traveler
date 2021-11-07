import React from 'react';
import style from '../../../styles/components/Places.module.css';
import Card from '../shared/Card';
import {mock} from '../../../mock/mock';

const Places: React.FC = () => {
  const mockCardHomeCol1 = mock().filter((p,i) => {
      return ( i < 3);
  });
  
  const mockCardHomeCol2 = mock().filter((p,i) => {
    return ( i > 1  );
  });

  return (
    <section className={style.places}>
      <div className={style.col}>
        {mockCardHomeCol1.map((p, index) => {
          return (
          <Card  {...p} key={index}/>
          );
        })}
      </div>
      <div className={style.col}>
        {mockCardHomeCol2.map((p, index) => {
          return (
            <Card  {...p} key={index}/>
          );
        })}
      </div>
    </section>
  );
};

export default Places;
