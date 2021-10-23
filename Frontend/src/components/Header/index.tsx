import React from 'react';
import Link from 'next/link';
import style from '../../../styles/components/Header.module.css';

export const Header: React.FC = () => {
  return (
    <nav className={style.container}>
      <Link href="/">
        <a>
          <img src="/images/Logo.svg" alt="logo" />
        </a>
      </Link>
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
