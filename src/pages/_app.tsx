import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import Footer from '../components/Footer/Footer';
import ContextProviders from '../context/index';
import Loader from '../components/Loader';
import Modal from '../components/shared/modal';
import GoToTOP from '../components/shared/GoToTOP';


function MyApp({ Component, pageProps }: AppProps) {
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
