import Document, { Html, Main, NextScript, Head } from 'next/document';


export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
