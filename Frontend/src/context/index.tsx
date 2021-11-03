import React from 'react';
import {PlacesProvider} from './usePlaces';

const Wrapper:React.FC = ({children}) => {

    return (
    <PlacesProvider>
        {children}
    </PlacesProvider>
       
    );

};

export default Wrapper;