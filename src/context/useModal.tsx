import React, { createContext, useState, useContext } from 'react';
import { IModal } from './types';

const ModalContext = createContext<IModal>({} as IModal);

export const ModalProvider: React.FC = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);
  // steps 0 = show avaliations 1 = form add avaliation 2 = success message
  const [steps, setSteps] = useState(0);
  const [rate, setRate] = useState(0);
  const [img, setImg] = useState('');
  const [isImage, setIsImage] = useState(false);
  const [sourceId, setSourceId] = useState('ssss');

    const handleOpenModal = (
      value:boolean, 
      showImg?: boolean, 
      img_url?: string, 
      sourceId?:string ) => {

      if(showImg){ 
        
        document.body.scrollTop = 0; 
        document.documentElement.scrollTop = 0;

        setIsImage(true); 
        setImg(img_url || '');
        setSourceId(sourceId || '');
        setIsOpen(value);
        
        return;
      }
      
        setIsImage(false);
        setImg('');
      

      if(!value && steps !== 2){
        setSteps(0);
        setRate(0);
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
        handleSetRate,
        img,
        isImage,
        sourceId
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
