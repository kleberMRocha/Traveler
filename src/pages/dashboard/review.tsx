import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React, { useEffect, useMemo, useState } from 'react';
import { FiTrash, FiUser } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import styles from '../../../styles/components/DashboardPlaces.module.css';
import LoaderPage from '../../components/shared/LoaderPage';
import api from '../../services/axios';
import { FiStar } from 'react-icons/fi';
import { format } from 'date-fns';


interface IPlace{
  places:{
    id: string,
    place_name: string,
  }[]
  attraction: [];
}

const PlaceDashboard:React.FC<IPlace> = ({places, attraction}) => {
  interface IReview {
    id: string;
    customer_name: string;
    img_url: string;
    attraction: {
      attraction_name: string;
    };
    review: string;
    created_at: string;
    rate: [];
    isPublished: boolean;
  }

  interface IAttraction{
    id:string;
    attraction:[]
  }

  const [allPlaces, setAllplaces] = useState(places);
  const [placeSelect, setPlaceSelect] = useState('');

  const [allAttraction, setAttraction] = useState(attraction as IAttraction[]);
  const [comboAttraction, setComboAttractions] = useState([]);
  const [attractionSelect, setAttractionSelect] = useState('');

  const [reviews, setReviews] = useState<IReview[]>([] as IReview[]);
  const [isLoading, setisLoading] = useState(false);
  const [viewFilter, setViewFilter] = useState<'all' | 'approved' | 'pedent'>(
    'all'
  );

  const [idToDelete, setId] = useState('');

  useEffect(() => {
    setAttractionSelect('');
    setReviews([]);
    if(!placeSelect)return;
    
      const attr = allAttraction.find((a:IAttraction) => {
        return  a.id === placeSelect;
      });
   
    if(attr){
      setComboAttractions(attr.attraction);
    }else{
      setComboAttractions([]);
    }
 
  },[placeSelect ])

  useEffect(() => {
    if(!attractionSelect){
      setReviews([]);
      return;
    }

    api
    .get('review')
    .then((res) => {
      const reviewArray = res.data.map((r: any) => {
        const getRate = (rate: string | []) => {
          const array = [];
          for (let i = 1; i < Number(rate); i++) {
            array.push(i);
          }
          return array;
        };

        const review = {
          id: r.id,
          customer_name: r.customer_name,
          img_url: r.img_url,
          attraction: {
            id: r.attraction.id,
            attraction_name: r.attraction.attraction_name,
          },
          review: r.review,
          created_at: format(new Date(r.created_at), 'dd/MM/yyyy'),
          rate: getRate(r.rate),
          isPublished: r.isPublished,
        };
        return review;
      });
  
      const finalreviewArray = reviewArray.filter((r:{attraction:{id:string}}) => {
        return r.attraction.id === attractionSelect;
      });

      setReviews(finalreviewArray);
    })
    .catch((err) => toast.error('Houve Um Erro'));
  
  },[attractionSelect])


  const reviewsStatus = useMemo(() => {
    const statusReview = {
      approved: 0,
      pedent: 0,
    };

    reviews.forEach((r) => {
      r.isPublished ? (statusReview.approved += 1) : (statusReview.pedent += 1);
    });

    return statusReview;
  }, [reviews]);

  const handleAprove = async (id: string) => {
    try {
      const response = await api.put(`review/${id}`);
      const newArray = reviews.map((r) => {
        if (r.id === id) {
          r.isPublished = !r.isPublished;
        }

        return r;
      });
      setReviews(newArray);
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.success('houve um erro no servidor');
    }
  };

  const handleShowCard = (value: boolean) => {
    if (viewFilter === 'all') return 'flex';
    if (viewFilter === 'approved') return value ? 'flex' : 'none';
    if (viewFilter === 'pedent') return !value ? 'flex' : 'none';
  };

  const handleDeleteReview = async (id:string, confirm:boolean):Promise<void> => {

    if(confirm){
      setisLoading(true);
      try {
        await api.delete(`review/${idToDelete}`);
        
        const newReviews = reviews
          .filter(r => r.id !== id);
          setReviews(newReviews);

        toast.success('Registro excluido com sucesso');
      } catch (error) {
        console.log(error);
        toast.error('Houve Um Erro');
      }finally{
        setId('');
        setisLoading(false);
        return;
      }
    }

    if(!idToDelete)setId(id); 

  };

  return (
    <section className={styles.container}>
      <ToastContainer />
      <h2>
        <FiUser /> Gerenciar Reviews
      </h2>
      <div className={styles.interacoes}>
        <select  value={placeSelect} placeholder='Selecione Um Lugar' onChange={(e) => setPlaceSelect(e.target.value)}>
        <option value={''}> Selecione ... </option>
          {allPlaces.map((p) => <option key={p.id} value={p.id}> {p.place_name} </option>)}
        </select>
        <select value={attractionSelect} onChange={(e) => setAttractionSelect(e.target.value)} placeholder='Selecione' disabled={!(!!placeSelect)} >
        <option  value={''} > Selecione ... </option>
          {
            comboAttraction.map((a:{id:string, attraction_name:string}) => {
              return <option key={a.id} value={a.id}> {a.attraction_name} </option>
            })
          }
        </select  >
      </div>
      <div>
        <span className={styles.statusReview}>
          <button type="button" onClick={() => setViewFilter('approved')}>
            Review Aprovadas: {reviewsStatus.approved}
          </button>
          |
          <button
            type="button"
            onClick={() => setViewFilter('pedent')}
            style={{
              background: `${
                viewFilter === 'pedent' ? 'var(--secondary)' : ''
              }`,
            }}
          >
            Review Não Aprovadas: {reviewsStatus.pedent}
          </button>
          |
          <button
            style={{
              background: `${viewFilter === 'all' ? 'var(--secondary)' : ''}`,
            }}
            onClick={() => setViewFilter('all')}
            type="button"
          >
            Todas: {reviewsStatus.approved + reviewsStatus.pedent}
          </button>
        </span>
      </div>
      <div className={styles.reviewCard}>
        <u>Ao aprovar uma Review ela aparecera na página do Evento</u>
        {isLoading ? (
          <LoaderPage />
        ) : (
          reviews.map((review) => {
            return (
              <span
                key={review.id}
                style={{
                  display: `${handleShowCard(review.isPublished)}`,
                  border: `${
                    review.isPublished
                      ? '2px solid #07bc0d4c'
                      : '2px solid #f1f1f1'
                  }`,
                }}
              >
                <div 
                className={styles.confirm} 
                style={{display: `${idToDelete === review.id ? 'flex' : 'none'}`}}>
                  <i>Certeza que deseja Excluir essa Review?</i> 
                  <div>
                    <button type='button' onClick={() => handleDeleteReview(review.id,true)}>Confirmar</button>
                    <button type='button' onClick={() => setId('')}>Cancelar</button>
                  </div>
                </div>
                <img src={review.img_url} alt={review.customer_name} />
                <b>{review.customer_name}</b>
                <p className={styles.reviewContainer}>
                  <b>{review.attraction.attraction_name}</b>
                  {review.review}
                  <small>{review.created_at}</small>
                  <small>
                    {review.rate.length} -{' '}
                    {review.rate.map((r) => (
                      <FiStar key={r} />
                    ))}
                  </small>
                </p>
                <button onClick={() => handleDeleteReview( review.id, false)} type='button' className={styles.excluirUm}>
                  <FiTrash />
                </button>
                <button
                  style={{
                    background: `${review.isPublished ? 'tomato' : ''}`,
                  }}
                  type="button"
                  onClick={() => handleAprove(review.id)}
                >
                  {review.isPublished ? 'Desaprovar' : 'Aprovar'}
                </button>
              </span>
            );
          })
        )}

        {<i>Total: {reviews.length} Reviews</i>}
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { traveller_token } = parseCookies(ctx);

  const response = await api.get('/places');
  const places = response.data.filter((p:{attraction:[]}) => p.attraction.length);

  const filterPlaces = response.data.filter((p:{attraction:[]}) => p.attraction.length);
  const attraction = filterPlaces.map((p:{attraction:[], id:string}) => {
    return {
      id: p.id,
      attraction: p.attraction
    }
  });

  if (!traveller_token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {},
    };
  }

  return { props: {places , attraction } };
};

export default PlaceDashboard;
