import React, { createContext, useCallback, useState, useContext } from 'react';
import { IModal } from './types';

const ModalContext = createContext<IModal>({} as IModal);

export const ModalProvider: React.FC = ({ children }) => {

  const [isOpen, setIsOpen] = useState(true);

    const handleOpenModal = (value:boolean) => {
        setIsOpen(value);
    };

  return (
    <ModalContext.Provider
      value={{  
        isOpen, 
        handleOpenModal:handleOpenModal}}
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
