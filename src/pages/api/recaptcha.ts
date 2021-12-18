
import type { NextApiRequest, NextApiResponse } from 'next'
import api from '../../services/axios';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {

    const secret_key = process.env.RECAPTCHA_SECRET;

    const sleep = () => new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 1000);
      });

    const { body, method } = req;
    const { captcha } = body;

    if (method === "POST") {
        if (!captcha) {
          return res.status(422).json({
            message: "Unproccesable request, please provide the required fields",
          });
        }

        try {
          
          const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${captcha}`;
          const response = await api.post(url);
          const captchaValidation = await response.data;

          if (captchaValidation.success) {
            await sleep();
            return res.status(200).send("OK");
          }
    
          return res.status(422).json({
            message: "Unproccesable request, Invalid captcha code",
          });

        } catch (error) {
          console.log(error);
          return res.status(422).json({ message: "Something went wrong" });
        }
      }

      return res.status(404).send("Not found");

}

