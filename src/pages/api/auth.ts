// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies';
import api from '../../services/axios';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {

try {
  const response = await api.post('auth', req.body);
  if(response.statusText === 'OK'){

  const { token, user } = response.data;

  nookies.set({res},'traveller_token',JSON.stringify({token: `Bearer ${token}`, user}), {
    maxAge: 60 * 60 * 24, //24h
    path: "/",
  });

  return res.status(200).json({token: `Bearer ${token}`, user});

  }
  
  return res.status(403).json({message: 'Senha ou login incorretos'});

} catch (error: any) {
  return res.status(403).json({ message: error.message });
}

 
}
