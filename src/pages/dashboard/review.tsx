import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import styles from '../../../styles/components/DashboardPlaces.module.css';
import LoaderPage from '../../components/shared/LoaderPage';
import api from '../../services/axios';
import { FiStar } from 'react-icons/fi';
import { format } from 'date-fns';

const PlaceDashboard = () => {
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

  const [reviews, setReviews] = useState<IReview[]>([] as IReview[]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    api
      .get('review')
      .then((res) => {
        const reviewArray = res.data.map((r:any) => {
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
              attraction_name:r.attraction.attraction_name
            },
            review: r.review,
            created_at: format(new Date(r.created_at), 'dd/MM/yyyy'),
            rate: getRate(r.rate),
            isPublished: r.isPublished,
          };
          return review;
        });

        setReviews(reviewArray);
      })
      .catch((err) => toast.error('Houve Um Erro'));
  }, []);

  const handleAprove =  async (id:string) => {
    try{
      const response = await api.put(`review/${id}`);
      const newArray = reviews.map(r => {
        if(r.id === id){
          r.isPublished = !r.isPublished;
        }
        return r;
      });
      setReviews(newArray);
      toast.success(response.data.message);

    }catch(err){
      console.log(err);
      toast.success('houve um erro no servidor');
    }
  };

  return (
    <section className={styles.container}>
      <ToastContainer />
      <h2>
        <FiUser /> Gerenciar Reviews
      </h2>
      <div className={styles.reviewCard}>
        <u>Ao aprovar uma Review ela aparecera na página do Evento</u>
        {isLoading ? (
          <LoaderPage />
        ) : (
          reviews.map((review) => {
            return (
              <span key={review.id} style={{border:`${review.isPublished ? '2px solid #07bc0d4c':'2px solid #f1f1f1'}`}}>
                <img src={review.img_url} alt={review.customer_name} />
                <b>{review.customer_name}</b>
                <p className={styles.reviewContainer}>
                  <b>{review.attraction.attraction_name}</b>
                  {review.review}
                  <small>{review.created_at}</small>
                  <small>
                   {review.rate.length} - {review.rate.map((r) => <FiStar key={r} />)}
                  </small>
                </p>
                <button style={{background:`${review.isPublished ? 'tomato': ''}`}}   type="button" onClick={() => handleAprove(review.id)}>
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

  if (!traveller_token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {},
    };
  }

  return { props: {} };
};

export default PlaceDashboard;
