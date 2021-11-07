import React, { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import style from '../../../styles/components/Header.module.css';
import {FiSearch} from 'react-icons/fi';
import { useRouter } from 'next/router';
import {usePlaces} from '../../context/usePlaces';
import { FaArrowCircleLeft, FaArrowLeft } from 'react-icons/fa';




export const Header: React.FC = () => {
  const {places, handleSearch} = usePlaces();

  const {back} = useRouter();


  const router = useRouter();
  const isHome = useMemo(() => router.pathname === '/',[router]);
  const getStyleBorder = useCallback(() => {
    return !isHome ? `${style.borderGray}` : '';
  },[isHome]);

  return (
    <nav className={`${style.container} ${getStyleBorder()}`}>
      <Link href="/">
        <a>
          <img src="/images/Logo.svg" alt="logo" />
        </a>
      </Link>

      { !isHome && <div><button onClick={() => back()} className={style.goBack} type='button'>
          <FaArrowLeft />
        </button></div>}

      {
        !isHome &&  (<span className={style.inputSearch}>
          <FiSearch /> <input 
                          onChange={(e) => handleSearch(e.target.value)}
                          type="text" 
                          placeholder="Qual cidade você procura?" 
                       />
        </span>)
      }
    
      <Link href="/signin">
      <a>
      <button type="button" className="btn-signin">
        Acesso restrito
      </button>
      </a>
      </Link>
    </nav>
  );
};
