import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import Footer from '../components/Footer/Footer';
import ContextProviders from '../context/index';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ContextProviders>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ContextProviders>
    </>
  );
}
export default MyApp;
