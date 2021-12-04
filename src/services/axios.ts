import Axios from 'axios';
const api = Axios.create({
  baseURL: 'http://localhost:4000/'
});


export default api;