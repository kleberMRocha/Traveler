import React from 'react';
import {PlacesProvider} from './usePlaces';
import {ModalProvider} from './useModal';

const Wrapper:React.FC = ({children}) => {

    return (
    <PlacesProvider>
        <ModalProvider>
             {children}
        </ModalProvider>
    </PlacesProvider>
       
    );

};

export default Wrapper;