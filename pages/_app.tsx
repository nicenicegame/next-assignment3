import type { AppProps } from 'next/app'
import GlobalStyle from '../styles/GlobalStyle'
import Navbar from '../components/Navbar'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Provider } from 'react-redux'
import { store } from '../app/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
