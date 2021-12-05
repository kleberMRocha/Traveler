import React, { useMemo } from 'react';
import { NavDash } from './DashboardNav';
import Link from 'next/link';
import style from '../../../styles/components/Header.module.css';
import { FiSearch, FiPower } from 'react-icons/fi';
import { useRouter } from 'next/router';

import { usePlaces } from '../../context/usePlaces';
import { useAuth } from '../../context/useAuth';
import { FaArrowLeft } from 'react-icons/fa';

export const Header: React.FC = () => {
  const { handleSearch } = usePlaces();
  const { isAuth, signout } = useAuth();

  const { back } = useRouter();
  const router = useRouter();

  const getStyleBorder = () => {
    return !isHome ? `${style.borderGray}` : '';
  };

  const handleLogout = async () => {
    localStorage.clear();
    signout();
    router.push('/');
  };

  const showInputSearch = useMemo(() => {
    return router.pathname === '/places';
  }, [router]);

  const isHome = useMemo(() => {
    return router.pathname === '/';
  }, [router]);

  return (
    <nav className={`${style.container} ${getStyleBorder()}`}>
      <Link href="/">
        <a>
          <img src="/images/Logo.svg" alt="logo" />
        </a>
      </Link>

      {!isHome && (
        <div>
          <button onClick={() => back()} className={style.goBack} type="button">
            <FaArrowLeft />
          </button>
        </div>
      )}

      {showInputSearch && (
        <span className={style.inputSearch}>
          <FiSearch />{' '}
          <input
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Qual cidade você procura?"
          />
        </span>
      )}

      { isAuth && <NavDash /> }

      {!isAuth ? (
        <Link href="/signin">
          <a>
            <button type="button" className="btn-signin">
              Acesso restrito
            </button>
          </a>
        </Link>
      ) : (
        <button 
          onClick={() => handleLogout()}
          type="button" 
          id={style['btn-logout']}
        >
          Logout <FiPower />
        </button>
      )}
    </nav>
  );
};
