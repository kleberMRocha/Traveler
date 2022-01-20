import React from 'react';
import Link from 'next/link';
import style from '../../../styles/components/Header.module.css';
import {FiUser, FiGlobe, FiCoffee, FiBarChart} from 'react-icons/fi'
import { useRouter } from 'next/router';

export const NavDash: React.FC = () => {

  const {asPath} = useRouter();

  const options = [
    { title: 'Dashboard', path: '/dashboard', icon:"FiBarChart" },
    { title: 'Gerenciar Lugares', path: '/dashboard/place', icon:"FiGlobe"},
    { title: 'Gerenciar Eventos', path: '/dashboard/attractions', icon:"FiCoffee"},
    { title: 'Gerenciar Avaliações', path: '/dashboard/review', icon:"FiUser" },
  ];

  const Icon = (iconName:string) => {

    return (iconName == 'FiUser' && <FiUser />)
     || (iconName == 'FiGlobe' && <FiGlobe />)
     || (iconName == 'FiCoffee' && <FiCoffee />)
     || (iconName == 'FiBarChart' && <FiBarChart />) 

  };

  return (
    <div className={style.navDash}>
      {options.map((opt) => {
        return (
          <Link  href={opt.path} key={opt.title}>
           <a className={ asPath === opt.path ? style.active : ''} >   
               { Icon(opt.icon) } {opt.title}
            </a> 
          </Link>
        );
      })}
    </div>
  );
};
