// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Axios from 'axios';
import {setCookie, parseCookies} from 'nookies';

const api = Axios.create({
  baseURL: 'http://localhost:4000/'
});




export default async function handler(req: NextApiRequest,res: NextApiResponse) {

try {
  const response = await api.post('auth', req.body);
  const { token } = response.data;

  setCookie(undefined,'traveller-token',`Bearer ${token}`, {
    maxAge: 60 * 60 * 24, //24h
  });


  return res.status(200).json({token: `Bearer ${token}`});
 
} catch (error: any) {
  return res.status(403).json({ message: error.message });
}

 
}
