import React, { createContext, useCallback, useState, useContext } from 'react';
import { mock } from '../../mock/mock';
import { cloneObj } from '../utils/cloneObj';
import { ICardProps, IPlacesData } from './types';

const PlacesContext = createContext<IPlacesData>({} as IPlacesData);

export const PlacesProvider: React.FC = ({ children }) => {
  const placesMock = mock();
  const [places, setPlaces] = useState<ICardProps[]>(placesMock);
  const [isAlphabetical, setAlphabetical] = useState(false);

  const sortPlacesBy = (parm: 'default' | 'newer' | 'alphabetical') => {
    const strategy = {
      default: () => {
        setPlaces(mock());
      },
      newer: () => {
        const placesToSort: ICardProps[] = JSON.parse(JSON.stringify(places));

        placesToSort.sort((a, b) => {
          setAlphabetical(true);
          return a.available_location > b.available_location ? -1 : 1;
        });

        setPlaces(placesToSort);
      },
      alphabetical: () => {
        const placesToSort: ICardProps[] = JSON.parse(JSON.stringify(places));

        if (!isAlphabetical) {
          placesToSort.sort((a, b) => {
            setAlphabetical(true);
            return a.location > b.location ? -1 : 1;
          });

          setPlaces(placesToSort);

          return;
        }

        placesToSort.sort((a, b) => {
          setAlphabetical(false);
          return a.location > b.location ? 1 : -1;
        });

        setPlaces(placesToSort);
      },
    };
    strategy[parm]();
  };

  const handleSearch = (value: string) => {
    if (value.length === 0) {
      setPlaces(mock());
      return;
    }
    if (value.length < 3) return;
    setPlaces(mock());

    let clone = cloneObj(places);
    let regex = new RegExp(value, 'gi');
    clone = clone.filter((p: { location: String }) => {
      return p.location.match(regex);
    });
    setPlaces(clone);
  };

  return (
    <PlacesContext.Provider
      value={{ places, sortPlacesBy, isAlphabetical, handleSearch }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

export function usePlaces(): IPlacesData {
  const context = useContext(PlacesContext);
  if (!context)
    throw new Error('AuthContext must be used within an AuthProvider');
  return context;
}
