import type { AppProps } from 'next/app'
import GlobalStyle from '../styles/GlobalStyle'
import Navbar from '../components/Navbar'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
