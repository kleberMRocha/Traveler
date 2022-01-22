import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import styleDash from '../../../styles/Dashboard.module.css';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IChart{
  infos: {
    attractions: any[],
    places: any[],
    review: any[],
  };
  type: 'att0';
}

export const ChartDash:React.FC<IChart> = ({infos, type}) => {
  const hasData = useMemo(() => {
  if(!(infos.attractions || infos.places || infos.review)) return false;
  return  !!(infos.attractions.length || infos.places.length || infos.review.length);
  },[infos]);

  const titleChart = {
    'att0': 'Eventos Por tipo'
  }
 
  const [options, setOptions] = useState({} as any);
  const [series, setSeries] = useState([{}] as any);


  const chartAttrationByType = () => {
    const  data = [0,0,0,0,0];

    infos.attractions.forEach(a => {
      data[a.attraction_type] = data[a.attraction_type] += 1;
    });

    setSeries( data );
    setOptions({
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
            }
          }
        }
      },
      series: data,
      labels: [
        'Alimentação',
        'Shows',
        'Exposição',
        'Trilhas',
        'Baladas / Festas',
      ]
    });
    
  };

  const typeChartRender = {
    'att0': chartAttrationByType
  }
 

  useEffect(() => {
    if(hasData){
      typeChartRender[type]();
    }
  },[]);

  const chartTypeEnum = (() => {
    const enums = {att0: 'donut'}

    return enums[type];
    
  })();

  return (
    <div className={styleDash.chartDash}>
      <p>{titleChart[type]}</p>
   {hasData && <Chart options={options} series={series} type={chartTypeEnum as any} /> }
  </div>
  );

};