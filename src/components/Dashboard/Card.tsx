import React from 'react';
import styleDash from '../../../styles/Dashboard.module.css';
import {FaCoffee, FaGlobe, FaUser} from 'react-icons/fa';

type IInfoCard = {
    infos?: {
        places?: number,
        review?: number,
        attractions?: number
    },
}

type IKeysCard = ['places'] | ['review'] | ['attractions'];


export const CardDashboard:React.FC<IInfoCard> = ({infos}) => {
    if(!infos)return <></>

    const array:IKeysCard  = (Object.keys(infos as IKeysCard)) as IKeysCard;
    
    const cardTiles = {
        places:'Total De Lugares',
        review:'Total De Reviews',
        attractions:'Total De Eventos',
    }


    return <div className={styleDash.card}>
            <span className={styleDash.cardTitle} >
               {
                   array.map(c => {
                        return cardTiles[c];
                   })
               } 
            </span>
            <span>
                {
                   array.map(c => {
                            if(c === 'review'){
                                return   <FaUser key={c} />
                            }
                            if(c === 'attractions'){
                                return  <FaCoffee  key={c}/>
                            }
                            if(c === 'places'){
                                return     <FaGlobe key={c}/>
                            }
                   })
               }
        
            </span>
            <span><p>{infos?.attractions || infos?.places || infos?.review }</p></span>
    </div>
};