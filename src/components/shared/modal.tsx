import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router'
import ReCAPTCHA from 'react-google-recaptcha';
import {
  FaComment,
  FaExclamationCircle,
  FaStar,
  FaTimes,
} from 'react-icons/fa';
import { FiTrash, FiUpload } from 'react-icons/fi';
import { useModal } from '../../context/useModal';
import { AvaliationCard } from '../../pages/turism/[id]';
import api from '../../services/axios';
import { reviewFormShape } from '../../services/yup';
import LoaderPage from './LoaderPage';

interface IRate {
  rate: number | string;
  handleSetRate: (value: string | number) => void;
}

const Rate: React.FC<IRate> = ({ rate, handleSetRate }) => {
  return (
    <div className="rate-container">
      <p>Sua nota de {rate} de 5</p>
      <div className="rate-avaliation">
        <button
          onClick={() => handleSetRate(1)}
          type="button"
          className={rate > 0 ? `active` : ''}
        >
          <FaStar />
        </button>
        <button
          onClick={() => handleSetRate(2)}
          type="button"
          className={rate > 1 ? `active` : ''}
        >
          <FaStar />
        </button>
        <button
          onClick={() => handleSetRate(3)}
          type="button"
          className={rate > 2 ? `active` : ''}
        >
          <FaStar />
        </button>
        <button
          onClick={() => handleSetRate(4)}
          type="button"
          className={rate > 3 ? `active` : ''}
        >
          <FaStar />
        </button>
        <button
          onClick={() => handleSetRate(5)}
          type="button"
          className={rate > 4 ? `active` : ''}
        >
          <FaStar />
        </button>
      </div>
    </div>
  );
};

interface IDisplayModal {
  handleOpenModal: (
    value: boolean,
    showImg?: boolean | undefined,
    img_url?: string | undefined
  ) => void;
  img: string;
  sourceId: string;
}

const DisplayImg: React.FC<IDisplayModal> = ({
  handleOpenModal,
  img,
  sourceId,
}) => {
  const [isLoading, setLaoding] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  const handleUpdateImg = async (value: FileList, type: string) => {
    const objectUrl = value[0] ? URL.createObjectURL(value[0]) : false;
    if (!imgRef.current) return;

    const file = new FormData();
    file.append('img', value[0], value[0]?.name);

    try {
      setLaoding(true);
      
      await type === 'attractions' 
      ? api.put(`attractions/img/${sourceId}`, file)
      : api.put(`places/img/${sourceId}`, file);

      setLaoding(false);
    } catch (error) {
      console.log(error);
      setLaoding(false);
    }

    imgRef.current.src = objectUrl || imgRef.current.src;
  };

  const {asPath} = useRouter();

  const type = (asPath.split('/')[2]);

  return (
    <>
      <div
        className="modalContainer"
        onClick={() => handleOpenModal(false)}
      ></div>
      <div className="modal">
        <div className="imgContainerModal">
          <button type="button" onClick={() => handleOpenModal(false)}>
            <FaTimes />
          </button>
          {isLoading ? (
            <LoaderPage />
          ) : (
            <img src={`${img}`} alt="Imagem" ref={imgRef} />
          )}
        </div>
        <label htmlFor="updateFileImgPlace" className="uploadImgModal">
          <input
            onChange={(e) => {
              if (e.target.files) {
                handleUpdateImg(e.target.files, type );
              }
            }}
            type="file"
            id="updateFileImgPlace"
            style={{ display: 'none' }}
          />
          <FiUpload /> Alterar a Imagem
        </label>
      </div>
    </>
  );
};

const Modal: React.FC = ({ children }) => {
  const {
    isOpen,
    handleOpenModal,
    handleNextStep,
    steps,
    img,
    isImage,
    sourceId,
  } = useModal();

  const [isValidRecaptcha, setRecaptcha] = useState(false);
  const [customerName, setName] = useState('');
  const [review, setReview] = useState('');
  const [attraction, setAttraction] = useState(
    '25d2ae9a-1519-479c-aaa7-49a0185020d1'
  );
  
  const [rate, setRate] = useState<string | number>('');
  const [imageReview, setImg] = useState({} as FileList | null);
  const [isLoading, setIsloading] = useState(false);
  
  const isCompleteForm = useMemo(() => {
    return Boolean(isValidRecaptcha 
    && customerName.length 
    && review.length
    && imageReview?.length
    && attraction
    && rate)
  },[isValidRecaptcha, review, imageReview, attraction, rate]);


  const reviewInput = useRef<any>(null);
  const nameInput = useRef<any>(null);
  const rateInput = useRef<any>(null);
  const imgInput = useRef<any>(null);


  const fileURL = useMemo(() => {
    return imageReview && imageReview[0]
      ? URL.createObjectURL(imageReview[0])
      : '';
  }, [imageReview]);

  const recaptchaRef = useRef<any>(null);
  const onReCAPTCHAChange = async (captchaCode: string) => {
    if (!captchaCode) {
      return;
    }

    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_API_NEXT}/api/recaptcha`,
        { captcha: captchaCode }
      );

      if (response.data === 'OK') {
        setRecaptcha(true);
      } else {
        throw new Error('Erro na validação');
      }
    } catch (err) {
      console.log(err);
      recaptchaRef.current.reset();
    }
  };

  const resetForm = () => {
    setIsloading(false);
    handleNextStep(2);
    setName('');
    setReview('');
    setRate('');
    setImg({} as FileList | null);

    nameInput.current.style = '';

    reviewInput.current.style = '';

    rateInput.current.style = '';

    setRecaptcha(false);

    recaptchaRef.current.reset();
  };

  const handelSubmit = async () => {
    
    if (!imageReview?.length) {
      imgInput.current.style = 'background: tomato';
      return;
    }else{
      imgInput.current.style = '';
    }

    if (!isValidRecaptcha) return;

    try {
      const isValid = await reviewFormShape.validate(
        {
          customer_name: customerName,
          review,
          attraction,
          imageReview,
          rate,
        },
        { abortEarly: false }
      );

      const formData = new FormData();
      formData.append('customer_name', isValid.customer_name);
      formData.append('review', isValid.review);
      formData.append('rate', isValid.rate);
      formData.append('attraction', isValid.attraction);
      if (imageReview && imageReview[0]) {
        formData.append('img', imageReview[0], 'imageReview');
      }

      try {
        setIsloading(true);
        await api.post('review', formData);
        resetForm();

      } catch (error) {
        console.log(error);
      }



    } catch (error: any) {
      const errors = [...error.inner];
      console.log(errors);
      errors.forEach((e) => {
        if (e.path === 'customer_name' && nameInput.current) {
          nameInput.current.style = 'border: 2px solid tomato';
        }

        if (e.path === 'review' && reviewInput.current) {
          reviewInput.current.style = 'border: 2px solid tomato';
        }

        if (e.path === 'customer_name' && rateInput.current) {
          rateInput.current.style = 'border: 2px solid tomato';
        }

      });

      return;
    }
  };

  if (isImage && img) {
    return (
      <DisplayImg
        img={img}
        handleOpenModal={handleOpenModal}
        sourceId={sourceId || ''}
      />
    );
  }

  return isOpen ? (
    <>
      <div
        className="modalContainer"
        onClick={() => handleOpenModal(false)}
      ></div>
      <div className="modal">
        <div className="modalHeader">
          {steps === 0 ? (
            <>
              <span>Nota 5.0</span>
              <span>
                <FaComment /> 23 comentários
              </span>
              <span>
                <button
                  onClick={() => handleNextStep(1)}
                  type="button"
                  id="btn-open-add-avaliation"
                >
                  Adicionar avaliação
                </button>
              </span>
            </>
          ) : (
            <h3>Adicionar avaliação</h3>
          )}
          <span>
            <button type="button" onClick={() => handleOpenModal(false)}>
              <FaTimes />
            </button>
          </span>
        </div>
        <div className={steps === 0 ? 'modalBody' : 'modalBodyForm'}>
          {steps === 0 ? (
            <>
              <AvaliationCard />
              <AvaliationCard />
              <AvaliationCard />
              <AvaliationCard />
              <AvaliationCard />
              <AvaliationCard />
              <AvaliationCard />
              <AvaliationCard />
              <AvaliationCard />
              <AvaliationCard />
              <AvaliationCard />{' '}
            </>
          ) : (
            <form className="formAvaliation">
              <div className="form-row-01">
                <label>
                  <a
                    ref={imgInput}
                    className="upload"
                    style={{
                      background: `${imageReview?.length ? '#51b853' : ''}`,
                    }}
                  >
                    Upload da sua foto
                  </a>
                  <input
                    onChange={(e) => setImg(e.target.files)}
                    type="file"
                    style={{ display: 'none' }}
                  />
                </label>
                <input
                  type="text"
                  name="name"
                  ref={nameInput}
                  maxLength={30}
                  onChange={(e) => setName(e.target.value)}
                  value={customerName}
                  placeholder="Seu nome completo"
                />
              </div>
              <div className="textArea">
                <textarea
                  ref={reviewInput}
                  onChange={(e) => setReview(e.target.value)}
                  value={review}
                  placeholder="Escreva aqui..."
                  rows={4}
                  maxLength={240}
                ></textarea>
                <p>Máximo 240 caracteres</p>
              </div>
              <div ref={rateInput}>
                <Rate handleSetRate={setRate} rate={rate} />
              </div>
              <div className="previewReview">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="normal"
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                  onChange={onReCAPTCHAChange as (token: string | null) => void}
                />
                <p>Preview</p>
                <div
                  className="preExemple"
                  style={{
                    display: imageReview?.length ? 'block' : 'none',
                  }}
                >
                  <img src={fileURL || ''} alt="customer avatar" />
                  <button
                    type="button"
                    onClick={() => {
                      setImg({} as FileList | null);
                    }}
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
              <div className="footer-modal">
                <span className="alert">
                  <FaExclamationCircle />
                  <p>Sua avaliação será analisada para poder ser publicada.</p>
                </span>

                {isLoading ? (
                  <LoaderPage />
                ) : (
                  <button
                    style={{background:`${!isCompleteForm ? 'gray' : ''}`}}
                    disabled={!isCompleteForm}
                    type="button"
                    className="enviar"
                    onClick={() => handelSubmit()}
                  >
                    Enviar avaliação
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
        {children}
      </div>
    </>
  ) : (
    <>
      {!isOpen && steps === 2 && (
        <div className="modal">
          <div className="end-validation">
            <span>😁</span>
            <h5>Avaliação enviada!</h5>
            <p>Agradecemos pelo seu tempo e colaboração.</p>
            <button onClick={() => handleNextStep(0)}>Fechar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
