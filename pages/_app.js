// import '../styles/globals.css'
import '../styles/globals.scss'
import Header from '../components/headers'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header></Header>
      <br/>
      <Component {...pageProps} />
      <Footer></Footer>
    </div>
    
  )
}

export default MyApp
