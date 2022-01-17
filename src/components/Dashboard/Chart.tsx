import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styleDash from '../../../styles/Dashboard.module.css';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const ChartDash:React.FC = () => {

  const [options, setOptions] = useState({
    chart: {
      id: 'line-chart',
    },
    xaxis: {
      categories: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
  });
  const [series, setSeries] = useState([
    {
      name: 'Hours of Sleep',
      data: [4.4, 3.5, 5.0, 4.2, 6.8, 8.1, 8.3],
    },
  ]);


  return (
    <div className={styleDash.chartDash}>
      <p>Eventos vs Locais</p>
    <Chart options={options} series={series} type='bar' />
  </div>
  );

};