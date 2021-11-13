import { getURL } from 'next/dist/shared/lib/utils';
import Head from 'next/head';
import React from 'react';
import { FaCoffee, FaStar, FaWhatsapp } from 'react-icons/fa';
import style from '../../../styles/Turism.module.css';

interface IAtendimento {
  dia: string;
  horario: string;
}

export const AvaliationCard: React.FC = () => {
  return (
    <div className={style.AvaliationCard}>
      <div>
        <img src="/images/mock/male.jpg" />
      </div>
      <div>
        <span className={style.cardAvaliationHeader}>
          <h6 className={style.customerName}>Patricksom Vieras </h6>
           <div>
           <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
           </div>
        </span>
        <small className="smallText">
          Grande variedade de bolos, cucas, tortas e algumas opções de salgados.
        </small>
        <hr />
      </div>
    </div>
  );
};

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
  const getUrlMap = () => {
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36553983.44087083!2d-96!3d56!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0d03d337cc6ad9%3A0x9968b72aa2438fa5!2zQ2FuYWTDoQ!5e0!3m2!1spt-BR!2sbr!4v1636678703863!5m2!1spt-BR!2sbr';
  };
  return (
    <div className={style.container}>
      <Head>
        <title> Doce & Companhia</title>
      </Head>
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
          <div>
            <h5>Endereço</h5>
            <iframe
              style={{ border: '1px solid #c2c2c2', borderRadius: '8px' }}
              src={getUrlMap()}
              width="100%"
              height="150"
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
            <small className="smallText">Rua 7 de Setembro, 319 - Jardim América 89160-170</small>
          </div>
          <div>
            <div className={style.avaliationContainer}>
              <span>
                <b className={style.titleAvaliation}>Avaliações</b>
              </span>
              <span className={style.avaliationRate}>
                <FaStar /> 5.0
              </span>
              <span>
                <button>Adicionar</button>
                <button>Ver todas</button>
              </span>
            </div>
            <div>
              <AvaliationCard />
              <AvaliationCard />
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
