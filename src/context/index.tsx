import React from 'react';
import { PlacesProvider } from './usePlaces';
import { ModalProvider } from './useModal';
import { AuthProvider } from './useAuth';

const Wrapper: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <PlacesProvider>
        <ModalProvider>{children}</ModalProvider>
      </PlacesProvider>
    </AuthProvider>
  );
};

export default Wrapper;
