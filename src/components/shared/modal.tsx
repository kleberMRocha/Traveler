import {
  FaComment,
  FaExclamationCircle,
  FaStar,
  FaTimes,
} from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { useModal } from '../../context/useModal';
import { AvaliationCard } from '../../pages/turism/[id]';

const Rate: React.FC = () => {
  const { rate, handleSetRate } = useModal();
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

const Modal: React.FC = ({ children }) => {
  const { isOpen, handleOpenModal, handleNextStep, steps, img, isImage } =
    useModal();

  if (isImage && img) {
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
            <img src={img} alt="Imagem" />
          </div>
          <button className="uploadImgModal">
            <FiUpload /> Alterar a Imagem
          </button>
        </div>
      </>
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
                  <a className="upload">Upload da sua foto</a>
                  <input type="file" style={{ display: 'none' }} />
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome completo"
                />
              </div>
              <div className="textArea">
                <textarea placeholder="Escreva aqui..." rows={10}></textarea>
                <p>Máximo 240 caracteres</p>
              </div>
              <div>
                <Rate />
              </div>
              <div className="footer-modal">
                <span className="alert">
                  <FaExclamationCircle />
                  <p>Sua avaliação será analisada para poder ser publicada.</p>
                </span>
                <button
                  type="button"
                  className="enviar"
                  onClick={() => handleNextStep(2)}
                >
                  Enviar avaliação
                </button>
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
