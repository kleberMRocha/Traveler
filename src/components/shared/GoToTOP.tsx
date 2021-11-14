import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const GoToTOP: React.FC = ({ children }) => {
  const [showButton, setShow] = useState(false);

  const handleVisibility = () => {

    if (window.scrollY < 500) {
      setShow(false);
      return;
    }

    if (window.scrollY > 500 && !showButton) {
      setShow(true);
      return;
    }
  };

  useEffect(() => {
    setInterval(() => {
      handleVisibility();
      return;
    }, 1000);
  }, []);

  return showButton ? (
    <>
      <button className="goUp" onClick={() => window.scrollTo(0, 0)}>
        <FaArrowUp />
      </button>
    </>
  ) : (
    <></>
  );
};

export default GoToTOP;
