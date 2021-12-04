// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import  {destroyCookie} from 'nookies';


export default async function handler(req: NextApiRequest,res: NextApiResponse) {

try {

  destroyCookie({res},'traveller_token', {
    path: '/'
  });

  return res.status(200).json({
     message: 'Success' 
  });

} catch (error: any) {
  return res.status(500).json({ message: error.message });
}

 
}
