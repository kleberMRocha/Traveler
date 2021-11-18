import React, { useState } from 'react';
import Link from 'next/link';
import style from './../../styles/Signin.module.css';
import { FaArrowLeft } from 'react-icons/fa';

interface IForm {
  type: string;
  handleChangeForm: (type: string) => void;
}

const FormSignin: React.FC<IForm> = ({ type, handleChangeForm }) => {
  return type === 'forgot' ? (
    <div className={style.container}>
      <h2>Esqueci Minha Senha</h2>
      <form>
        <label htmlFor="email">E-mail </label>
        <input type="text" name="user" id="email" placeholder="E-mail" />

        <button>Enviar E-mail de Recuperação</button>
      </form>

      <button
        onClick={() => handleChangeForm('signin')}
        className={style.changeForm}
      >
        <FaArrowLeft /> Voltar ao Login
      </button>
    </div>
  ) : (
    <div className={style.container}>
      <h2>Acesso restrito</h2>
      <form>
        <div className={style.logo}>
          <img src="/images/Logo.svg" alt="logo" />
        </div>

        <label htmlFor="email">E-mail </label>
        <input type="text" name="user" id="email" placeholder="E-mail" />

        <label htmlFor="password">Senha </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
        />
        <button>Acessar</button>
      </form>

      <button
        type="button"
        onClick={() => handleChangeForm('forgot')}
        className={style.changeForm}
      >
        Esqueci minha senha 😱 !
      </button>
    </div>
  );
};

const Login: React.FC = () => {
  const [formType, setFormType] = useState('signin');

  return (
    <section className={style.signinContainer}>
      <FormSignin type={formType} handleChangeForm={setFormType} />
      <div className={style['container-background']}></div>
    </section>
  );
};

export default Login;
