import React from "react";
import style from '../../../styles/components/Filter.module.css';
import {FaArrowDown} from 'react-icons/fa';

export const Filter:React.FC = () => {
    return <nav className={style.filter}>
        <span id={style['active-filter']}>Todas</span>
        <span>Mais Recente</span>
        <span>A - Z <FaArrowDown size={10} /></span>
    </nav>
};