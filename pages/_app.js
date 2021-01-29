import { CookiesProvider } from 'react-cookie';
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}

export default MyApp
