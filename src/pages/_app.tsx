import { SessionProvider } from 'next-auth/react';
import '../styles/global.scss';

const App = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
);

export default App;
