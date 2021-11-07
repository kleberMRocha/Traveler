import React from 'react';
import { useRouter } from 'next/router';
import { usePlaces } from '../../context/usePlaces';
import style from '../../../styles/Locations.module.css';
import { FaCamera, FaLightbulb } from 'react-icons/fa';
import Card from '../../components/shared/Card';
import { ICardProps } from '../../context/types';
import Link from 'next/link';

interface IHighligh{
    locationInfos: ICardProps;
    id: string | number;
}

const Indicador: React.FC = () => {
  return (
    <div className={style.indcations}>
      <div>
        <FaCamera />
      </div>
      <hr />
      <b>67</b>
      <p>Ponto Turísticos</p>
    </div>
  );
};

const Highlighted: React.FC<IHighligh> = ({locationInfos, id}) => {

    return ( 
      <>
      <Link href={`/location/${id}`}>
        <a>
        <div className={style.highlighted}>
            <div className={style.highlightedInfos}>
                <span><FaLightbulb /> Destaque</span>
                <h2>Praia dos Ingleses</h2>
                <p>
                Uma parte do paraíso na terra. Frequentemente com águas
                claras em tons verdes e azuis. Um dos locais mais preferidos
                por turistas e viajantes.
                </p>
            </div>
            <div className={style.highlightedImg} style={{ background: `url(${locationInfos?.picture})` }}></div>
        </div>
        </a>
      </Link>
    </>)
};

const Location = () => {
  const { places } = usePlaces();
  const { asPath,back } = useRouter();
  const slug = asPath.split('/')[2];
  const locationInfos = places.find((p) => p.id === slug);

  return (
    locationInfos ? 
    <>
      <section>
        <div
          className={style['header-location']}
          style={{ background: `url(${locationInfos?.picture})` }}
        ></div>
        <div className={style.locationInfos}>
          <h2 className={style.locationTitle}>{locationInfos?.location}</h2>
          <p className={style.description}>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            eget ultrices sapien. Cras dignissim pretium ante, quis pulvinar
            lorem ornare ac. Nulla facilisi. Vestibulum vel ultricies felis,
            condimentum mollis ipsum.
          </p>
          <p className={style.moreInfos}>
            Aliquam lacus ligula, pulvinar sed vulputate nec, pulvinar in metus.
            Aenean vel congue metus. Phasellus eleifend, ligula in hendrerit
            sollicitudin, eros erat gravida sapien, id sodales eros nulla id
            turpis. Pellentesque interdum eros eros, a egestas nisl tempus quis.
          </p>
          <div className={style.containerIndicators}>
            <Indicador />
            <Indicador />
            <Indicador />
          </div>
        </div>
      </section>
      <section>
          <div className={style.avaliations}>
            <h2 className={style.locationTitle}>Top avaliados</h2>
            <div className={style.top}>

            <Card   {...locationInfos} isTopAvaliation/>
            <Card   {...locationInfos} isTopAvaliation/>
            <Card   {...locationInfos} isTopAvaliation/>
            <Card   {...locationInfos} isTopAvaliation/>

            </div>
            <Highlighted locationInfos={locationInfos} id={locationInfos.id}/>
          </div>
      </section>
    </> 
    :<><p>...Carregando</p></>
  );
};

export default Location;
