import '../../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import Footer from '../components/Footer/Footer';
import ContextProviders from '../context/index';
import Loader from '../components/Loader';
import Modal from '../components/shared/modal';
import GoToTOP from '../components/shared/GoToTOP';
import { parseCookies } from 'nookies';
import api from '../services/axios';

function MyApp({ Component, pageProps }: AppProps) {

const cookies = parseCookies();
const { traveller_token } = cookies;

let token;
if(traveller_token){
 const traveller = JSON.parse(traveller_token);
 token = traveller.token;
}

api.defaults.headers.common['Authorization'] = token || '';

  return (
    <>
      <ContextProviders>
        <GoToTOP />
        <Modal  />
         <Loader time={1000}/> 
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ContextProviders>
    </>
  );
}
export default MyApp;
