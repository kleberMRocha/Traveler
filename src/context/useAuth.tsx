import React, { createContext, useState, useContext, useEffect } from 'react';
import { IAuth, IUser } from './types';
import api from '../services/axios';
import { parseCookies } from 'nookies';

const AuthContext = createContext<IAuth>({} as IAuth);

interface ICookie{
  token:string;
  user: IUser
}

export const AuthProvider: React.FC = ({ children }) => {

  useEffect(() => {
    const cookies = parseCookies();

    if(cookies.traveller_token){
      const traveller_token =  JSON.parse(cookies.traveller_token);
      setAuth(traveller_token);
    }

  },[]);
  
  const [isAuth, setIsAuth] = useState(() => {
    const cookies = parseCookies();
    return !!(cookies.traveller_token);
  });

  const [user, setUser] = useState({} as IUser);
  const [token, setToken] = useState('');

    const setAuth = (value:{token: string, user:IUser}) => {
      const {token, user} = value;
      if(!token || !user ) return;

      setIsAuth(true);
      setUser(user);
      setToken(token);
        
    }

   const signout = async () => {

    setIsAuth(false);
    setUser({id:'', email:'', firstName:''});
    setToken('');

    await api.get('/signout');

   };

     
  return (
    <AuthContext.Provider
      value={{  
        signout,
        setAuth,
        isAuth, 
        user,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuth {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('AuthContext must be used within an AuthProvider');
  return context;
}