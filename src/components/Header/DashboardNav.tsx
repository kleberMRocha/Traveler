import React, { useMemo } from 'react';
import Link from 'next/link';
import style from '../../../styles/components/Header.module.css';
import {FiUser, FiGlobe, FiCoffee} from 'react-icons/fi'

export const NavDash: React.FC = () => {
  const options = [
    { title: 'Cadastrar um Lugar', path: '/dashboard/place', icon:"FiUser"},
    { title: 'Cadastrar um Evento', path: '/dashboard/place', icon:"FiGlobe"},
    { title: 'Gerenciar Avaliações', path: '/dashboard/place', icon:"FiCoffee" },
  ];

  const Icon = (iconName:string) => {

    return (iconName == 'FiUser' && <FiUser />)
     || (iconName == 'FiGlobe' && <FiGlobe />)
     || (iconName == 'FiCoffee' && <FiCoffee />) 

  };

  return (
    <div className={style.navDash}>
      {options.map((opt) => {
        return (
          <Link  href={opt.path} key={opt.title}>
              {/* className={style.active} */}
           <a>   { Icon(opt.icon) } {opt.title} </a> 
          </Link>
        );
      })}
    </div>
  );
};
