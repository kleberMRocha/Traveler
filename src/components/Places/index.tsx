import React, { useEffect, useState } from 'react';
import style from '../../../styles/components/Places.module.css';
import Card from '../shared/Card';
import { mock } from '../../../mock/mock';

interface IPlace{
  location: string;
    picture: string;
    available_location: number;
    id: string;
}


const Places: React.FC = () => {
  const [mockCardHomeCol1, setcolOne] = useState([] as IPlace[]);
  const [mockCardHomeCol2, setcoltwo] = useState([]as IPlace[]);

  useEffect(() => {
    const col1 = mock().filter((p, i) => {
      return i < 3;
    });

    const col2 = mock().filter((p, i) => {
      return i > 1;
    });

    setcolOne(col1);
    setcoltwo(col2);

  }, []);

  return (
    <section className={style.places}>
      <div className={style.col}>
        {mockCardHomeCol1.map((p, index) => {
          return <Card isTopAvaliation={false} {...p} key={index} />;
        })}
      </div>
      <div className={style.col}>
        {mockCardHomeCol2.map((p, index) => {
          return <Card isTopAvaliation={false} {...p} key={index} />;
        })}
      </div>
    </section>
  );
};

export default Places;
