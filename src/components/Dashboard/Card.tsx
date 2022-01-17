import React from 'react';
import styleDash from '../../../styles/Dashboard.module.css';
import {FaGlobe} from 'react-icons/fa';

export const CardDashboard:React.FC = () => {
    return <div className={styleDash.card}>
            <span className={styleDash.cardTitle} >Total De Lugares</span>
            <span><FaGlobe /></span>
            <span><p>350</p></span>
    </div>
};