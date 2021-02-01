import { CookiesProvider } from 'react-cookie';
function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
