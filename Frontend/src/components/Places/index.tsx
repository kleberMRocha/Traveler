import React from 'react';
import style from '../../../styles/components/Places.module.css';

const Places: React.FC = () => {
  const mock = () =>
    [1, 2, 3].map(() => {
      return {
        location: 'Florianópolis',
        picture: 'images/mock/4603535831.png',
        available_location: '5',
      };
    });

  return (
    <section className={style.places}>
      <div className={style.col}>
        {mock().map((p, index) => {
          return (
            <div 
            key={`${p.location}-${index}`} 
            className={style.location} 
            style={{background:`url(${p.picture})`, backgroundSize:'contain' }}>
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
      <div className={style.col}>
        {mock().map((p, index) => {
          return (
            <div 
            key={`${p.location}-${index}`} 
            className={style.location}
            style={{background:`url(${p.picture})`, backgroundSize:'contain' }}
            
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
