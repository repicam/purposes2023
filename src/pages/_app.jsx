import { Layout } from 'components/Layout'
import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'

export default function App({ Component, pageProps, router }) {

  const isLogged = router?.pathname !== '/login' 
  return (
    <Layout isLogged={isLogged}>
      <Component {...pageProps} />
    </Layout>
  )
}