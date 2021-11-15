import React, { createContext, useState, useContext } from 'react';
import { IModal } from './types';

const ModalContext = createContext<IModal>({} as IModal);

export const ModalProvider: React.FC = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);
  // steps 0 = show avaliations 1 = form add avaliation 2 = success message
  const [steps, setSteps] = useState(0);
  const [rate, setRate] = useState(0);

    const handleOpenModal = (value:boolean) => {
      if(!value && steps !== 2){
        setSteps(0);
      }

      window.scrollTo(0, 0);
        setIsOpen(value);

        
    };

    const handleNextStep = (value:number) => {
      if(value === 2){
        handleOpenModal(false);
        setSteps(value);
        return;
      }
      setSteps(value);
    };

    const handleSetRate = (value:number) => {
      setRate(value === rate ? 0 : value);
    };

  return (
    <ModalContext.Provider
      value={{  
        isOpen, 
        handleOpenModal,
        handleNextStep,
        steps,
        rate,
        handleSetRate
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export function useModal(): IModal {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error('AuthContext must be used within an AuthProvider');
  return context;
}
