import React, { useState, useMemo, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import {parseCookies} from 'nookies';
import style from './../../styles/Signin.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import {useAuth} from '../context/useAuth';
import Router from 'next/router'


interface IForm {
  type: string;
  handleChangeForm: (type: string) => void;
}

interface IFormField {
  value: string;
  isErrored: boolean;
  name: string;
}

const FormSignin: React.FC<IForm> = ({ type, handleChangeForm }) => {

  const {setAuth, user, token, isAuth} = useAuth();


  const [form, setform] = useState<IFormField[]>([
    {
      value: '',
      isErrored: false,
      name: 'email',
    },
    {
      value: '',
      isErrored: false,
      name: 'password',
    },
  ]);

  const formPayLoad = useMemo(() => {
    const payload = { email: '', password:'' };
    form.forEach((p) => {
      return payload[p.name as 'email' | 'password'] = p.value
    });

    return payload;

  },[form]);

  const handleChange = (value: string, name: string) => {
    const newValues = form.map((v) => {
      v.name === name 
        ? v.value = value 
        : v;

      return v;
    });
    setform(newValues);
  };

  const handleSignin  = async () => {
    fetch('http://localhost:3000/api/auth', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formPayLoad),
      method:'POST'
    }).then(res => res.json())
    .then(res => {

      if(res.token && res.user){
        setAuth(res);
        localStorage.setItem('@traveller-token', JSON.stringify(res));
        Router.push('/dashboard');

      }

      return;

  
    })
    .catch(err => console.log(err))
  };

  return type === 'forgot' ? (
    <div className={style.container}>
      <h2>Esqueci Minha Senha</h2>
      <form>
        <label htmlFor="email">E-mail </label>
        <input
          type="text"
          name={form[0].name}
          value={form[0].value}
          id="email"
          placeholder="E-mail"
          onChange={(e) => handleChange(e.target.value, 'email')}
        />

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
        <input
          type="text"
          name={form[0].name}
          id="email"
          placeholder="E-mail"
          value={form[0].value}
          onChange={(e) => handleChange(e.target.value, 'email')}
        />

        <label htmlFor="password">Senha </label>
        <input
          type="password"
          id="password"
          value={form[1].value}
          name={form[1].name}
          placeholder="Senha"
          onChange={(e) => handleChange(e.target.value, 'password')}
        />
        <button type="button" onClick={ async () => await handleSignin()}
        
        >Acessar</button>
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

const Login: React.FC = (props) => {
  const [formType, setFormType] = useState('signin');

  return (
    <section className={style.signinContainer}>
      <FormSignin type={formType} handleChangeForm={setFormType} />
      <div className={style['container-background']}></div>
    </section>
  );
};


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {traveller_token} = parseCookies(ctx);
  if(!traveller_token) return { props: {} };

  const {token, user} = JSON.parse(traveller_token);
  
  return { redirect: {
    destination: '/dashboard',
    permanent: false,
  } ,props: { token, user } }
}

export default Login;
