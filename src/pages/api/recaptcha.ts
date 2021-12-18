
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    const secret_key = process.env.RECAPTCHA_SECRET;
    const response_key = req.body["g-recaptcha-response"];

    console.log(response_key);
    
    console.log(secret_key);
    res.send('Bom dia');

    


}

