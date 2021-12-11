import Axios from 'axios';
import { parseCookies } from 'nookies';


const api = Axios.create({
  baseURL: 'http://localhost:4000/',
  
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