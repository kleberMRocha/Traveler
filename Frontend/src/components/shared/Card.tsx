import React  from "react";
import style from '../../../styles/components/Places.module.css';
import {ICardProps} from '../../context/types';

const Card:React.FC<ICardProps> = ({id,available_location,location,picture,children}) => {

    return (
    <div 
        key={`${location}-${id}`} 
        className={style.location} 
        style={{background:`url(${picture})`}}>
           <div className={style.container}>
            <span>
               <h3> {location} </h3>
               <small>{available_location} locais</small>
            </span>
          </div>
        </div>)
};

export default Card;