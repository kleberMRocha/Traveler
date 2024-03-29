import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import styleDash from '../../../styles/Dashboard.module.css';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IChart {
  infos: {
    attractions: any[];
    places: any[];
    review: any[];
  };
  type: 'att0' | 'att1' | 'rev0' | 'rev1' | 'pla0';
}

export const ChartDash: React.FC<IChart> = ({ infos, type }) => {
  const hasData = useMemo(() => {
    if (!(infos.attractions || infos.places || infos.review)) return false;
    return !!(
      infos.attractions.length ||
      infos.places.length ||
      infos.review.length
    );
  }, [infos]);

  const titleChart = {
    att0: 'Eventos Por tipo',
    att1: 'Eventos vs Lugares',
    rev0: 'Review Aprovadas',
    rev1: 'Review vs Eventos',
    pla0: 'Lugares',
  };

  const [options, setOptions] = useState({} as any);
  const [series, setSeries] = useState([{}] as any);

  const ChartPlaces = () => {
    const seriesPlace: any[] = [];
    const categories: any[] = [];

    infos.places.map((p) => {
      if (!p.attraction.length) {
        seriesPlace.push({ name: p.place_name, data: 0 });
        categories.push(p.place_name);
        return;
      }

      const eventos = p.attraction.length;
      categories.push(p.place_name);
      seriesPlace.push( eventos );
    });

    setSeries([{ data: seriesPlace }]);

    setOptions({
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          dataLabels: {
            position: 'center',
          },
        }
      },
      xaxis: {
        categories
      }
    });
  };

  const chartReviewApproved = () => {
    const data = { approval: 0, pending: 0 };

    infos.review.forEach((r) => {
      r.isPublished ? data.approval++ : data.pending++;
    });

    setSeries([data.approval, data.pending]);

    setOptions({
      plotOptions: {
        pie: {
          expandOnClick: true,
        },
      },
      series: data,
      labels: ['Aprovados', 'Pendentes'],
    });
  };

  const ChartReviewVsEventos = () => {
    let data = [{ name: 'Eventos', data: [0] }];
    const ids: string[] = [];
    let series: { id: string; qtd: number }[] = [];

    const labels: string[] = [];

    infos.review.forEach((p) => {
      if (!ids.includes(p.attraction.id)) {
        ids.push(p.attraction.id);
        labels.push(p.attraction.attraction_name);
        series.push({
          id: p.attraction.id,
          qtd: 1,
        });
      } else {
        const newSeries = series.map((s) => {
          if (p.attraction.id === s.id) {
            s.qtd = s.qtd += 1;
          }
          return s;
        });
        series = newSeries;
      }
    });

    const seriesNumber = series.map((s) => s.qtd);

    data = [{ name: 'Eventos', data: seriesNumber }];

    setSeries(data);
    setOptions({
      plotOptions: {
        bar: {
          distributed: true,
        },
      },
      series: data,
      labels,
    });
  };

  const chartAttrationByType = () => {
    const data = [0, 0, 0, 0, 0];

    infos.attractions.forEach((a) => {
      data[a.attraction_type] = data[a.attraction_type] += 1;
    });

    setSeries(data);
    setOptions({
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
            },
          },
        },
      },
      series: data,
      labels: [
        'Alimentação',
        'Shows',
        'Exposição',
        'Trilhas',
        'Baladas / Festas',
      ],
    });
  };

  const chartAttrationVsPlace = () => {
    let data = [{ name: 'Eventos', data: [0] }];
    const series: number[] = [];

    const labels: string[] = [];

    infos.places.forEach((p) => {
      labels.push(p.place_name);
      series.push(p.attraction.length);
    });

    data = [{ name: 'Eventos', data: series }];

    setSeries(data);
    setOptions({
      plotOptions: {
        bar: {
          distributed: true,
        },
      },
      series: data,
      labels,
    });
  };

  const typeChartRender = {
    att0: chartAttrationByType,
    att1: chartAttrationVsPlace,
    rev0: chartReviewApproved,
    rev1: ChartReviewVsEventos,
    pla0: ChartPlaces,
  };

  useEffect(() => {
    if (hasData) {
      typeChartRender[type]();
    }
  }, []);

  const chartTypeEnum = (() => {
    const enums = {
      att0: 'donut',
      att1: 'bar',
      rev0: 'pie',
      rev1: 'bar',
      pla0: 'bar',
    };

    return enums[type];
  })();

  return (
    <div className={type === 'pla0' ? styleDash.chartDashfull : styleDash.chartDash}>
      <p>{titleChart[type]}</p>
      {hasData && (
        <Chart
          width={'100%'}
          height={type === 'pla0' ? 400 : ''}
          options={options}
          series={series}
          type={chartTypeEnum as any}
        />
      )}
    </div>
  );
};
