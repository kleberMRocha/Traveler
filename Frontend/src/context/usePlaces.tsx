import React, { createContext, useCallback, useState, useContext } from 'react';
import {mock} from '../../mock/mock';
import {IPlacesData} from './types'

const PlacesContext = createContext<IPlacesData>({} as IPlacesData);

export const PlacesProvider:React.FC = ({children}) => {
    const placesMock = mock();
    const [places,setPlaces] = useState(placesMock);

    const sortPlacesBy = () => {};

    return (<PlacesContext.Provider value={{places,sortPlacesBy}}>
        {children}
    </PlacesContext.Provider>)

};

export function usePlaces(): IPlacesData {
    const context = useContext(PlacesContext);
    if (!context) throw new Error('AuthContext must be used within an AuthProvider');
    return context;
}
