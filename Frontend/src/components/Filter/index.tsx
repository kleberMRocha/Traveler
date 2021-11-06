import React, { useState } from "react";
import style from '../../../styles/components/Filter.module.css';
import {FaArrowDown, FaArrowUp} from 'react-icons/fa';
import {usePlaces} from '../../context/usePlaces';


export const Filter:React.FC = () => {

    const {places,sortPlacesBy,isAlphabetical} = usePlaces();
    const [activeFilter, setActiveFilteer] = useState('default');

    const getAtiveStyle = (type:string) => {
        return activeFilter  === type ? style['active-filter'] : '';
    }

    const handleSortBY = (parm : "default" | "newer" | "alphabetical") => {
        setActiveFilteer(parm);
        sortPlacesBy(parm);
    };

    return <nav className={style.filter}>
        <span id={getAtiveStyle('default')}>
            <button type="button" onClick={() => handleSortBY('default')}>Todas</button>
        </span>
        <span id={getAtiveStyle('newer')}>
            <button type="button" onClick={() => handleSortBY('newer')}>
                Mais Recente
            </button>
        </span>
        <span id={getAtiveStyle('alphabetical')}>
        <button type="button" onClick={() => handleSortBY('alphabetical')}>
            A - Z  {isAlphabetical ? <FaArrowDown size={10} /> : <FaArrowUp size={10} />   }
        </button>
        </span>
    </nav>
};