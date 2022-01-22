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
  type: 'att0' | 'att1';
}

export const ChartDash:React.FC<IChart> = ({infos, type}) => {
  const hasData = useMemo(() => {
  if(!(infos.attractions || infos.places || infos.review)) return false;
  return  !!(infos.attractions.length || infos.places.length || infos.review.length);
  },[infos]);

  const titleChart = {
    'att0': 'Eventos Por tipo',
    'att1': 'Eventos vs Lugares',
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

  const chartAttrationVsPlace = () => {
    let  data = [{ name: "Eventos", data: [0] }]
    const series:number[] = [];

    const labels:string[] = [];

    infos.places.forEach(p => {
      labels.push(p.place_name);
      series.push(p.attraction.length);
    });

    data = [{ name: "Eventos", data: series }]

    setSeries( data );
    setOptions({
      plotOptions: {
        bar: {
          distributed: true
        }
      },
      series: data,
      labels,
    });
    
  };

  const typeChartRender = {
    'att0': chartAttrationByType,
    'att1': chartAttrationVsPlace
  }
 

  useEffect(() => {
    if(hasData){
      typeChartRender[type]();
    }
  },[]);

  const chartTypeEnum = (() => {
    const enums = {
      att0: 'donut',
      att1: 'bar'
    }

    return enums[type];
    
  })();

  return (
    <div className={styleDash.chartDash}>
      <p>{titleChart[type]}</p>
   {hasData && <Chart options={options} series={series} type={chartTypeEnum as any} /> }
  </div>
  );

};