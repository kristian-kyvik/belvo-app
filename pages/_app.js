import Head from 'next/head';
import Header from "../components/Header";
import '../styles/index.css'

const Layout = ({ children, pageProps }) => (
  <div className="layout">
 		<Head>
 		  <title>Belvo app</title>
 		  <meta name="viewport" content="initial-scale=1.0, width=device-width" />
 		  {
 		    //<script src="https://cdn.belvo.io/belvo-widget-1-stable.js" async></script>
 		  }
 		  <script src="https://cdn.belvo.io/belvo-widget-sandbox-1-stable.js"></script>
 		</Head>
    <Header/>
    <main className=" h-screen relative">
      <div className="absolute pt-12 flex flex-col top-0 right-0 left-0 bottom-0">
        {children}
      </div>
    </main>
  </div>
)

function MyApp({ Component, pageProps }) {
  return (
  	<Layout>
  	  <Component {...pageProps} /> 
  	</Layout>
 	)
}

export default MyApp