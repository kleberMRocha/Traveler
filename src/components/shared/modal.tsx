import { FaComment, FaTimes } from 'react-icons/fa';
import { useModal } from '../../context/useModal';
import { AvaliationCard } from '../../pages/turism/[id]';

const Modal: React.FC = ({ children }) => {
  const { isOpen,handleOpenModal } = useModal();

  return isOpen ? (
    <>
      <div className="modalContainer" onClick={() => handleOpenModal(false)}></div>
      <div className="modal">
        <div className="modalHeader">
          <span>Nota 5.0</span>
          <span>
            <FaComment /> 23 comentários
          </span>
          <span>
            <button type="button" id="btn-open-add-avaliation">Adicionar avaliação</button>
          </span>
          <span>
            <button type="button" onClick={() => handleOpenModal(false)}>
              <FaTimes />
            </button>
          </span>
        </div>
        <div className="modalBody">
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
          <AvaliationCard />
        </div>
        {children}
      </div>
    </>
  ) : (
    <></>
  );
};

export default Modal;
