import Head  from 'next/head';
import React from 'react';
import { FaCoffee, FaWhatsapp } from 'react-icons/fa';
import style from '../../../styles/Turism.module.css';

interface IAtendimento {
  dia: string;
  horario: string;
}

const mockAtendimento = [
  { dia: 'Domingo', horario: '8h - 18h' },
  { dia: 'Sábado', horario: '8h - 18h' },
];

const DiasAtendimento: React.FC<IAtendimento> = ({ dia, horario }) => {
  return (
    <div className={style.schedule}>
      <p>{dia}</p>
      <p>
        <b>{horario}</b>
      </p>
    </div>
  );
};

const Turism = () => {
  return (
    <div className={style.container}>
        <Head> <title> Doce & Companhia</title></Head>
      <div>
        <section>
          <h2>Doce & Companhia</h2>
          <p>
            O melhor lugar da cidade para você tomar um bom café. Fatias de
            tortas artesanais, bolos, lanches e biscoitos caseiros.
          </p>
        </section>
        <section>
          <h5>Atendimento</h5>
          <div className={style.scheduleContainer}>
            {mockAtendimento.map((atendimento) => {
              const { dia, horario } = atendimento;
              return <DiasAtendimento key={dia} dia={dia} horario={horario} />;
            })}
          </div>
          <div className={style.whatsapContainer}>
              <button type="button" className={style.whatsap}>
                    <FaWhatsapp />
                    Entrar em contato
              </button>
              <div>
                <h6>Telefone:</h6>
                <p>(XX) XXXX-XXXX</p>
              </div>
          </div>
        </section>
      </div>
      <section>
        <div className={style.turismImage}>
          <div className={style.tag}>
            <FaCoffee />
          </div>
          <img src="/images/mock/Foto.png" alt="Doce Companhia" />
        </div>
      </section>
    </div>
  );
};

export default Turism;
