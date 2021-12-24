import Axios from 'axios';
import { parseCookies } from 'nookies';
import {useAuth} from '../context/useAuth';

const nodeApi = process.env.NEXT_PUBLIC_DOMAIN_API_NODE;

const api = Axios.create({
  baseURL: nodeApi,
});


const cookies = parseCookies();
const { traveller_token } = cookies;

let token;
if(traveller_token){
 const traveller = JSON.parse(traveller_token);
 token = traveller.token;
}

api.defaults.headers.common['Authorization'] = token || '';

export default api;