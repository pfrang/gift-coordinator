import '../styles/globals.css'
import '../styles/checkmark-btn.scss'
import type { AppProps } from 'next/app'
import Layout from './components/StylingDivs/Layout'
import { SessionProvider, useSession } from 'next-auth/react'
import { useState } from 'react'
import Modal from 'react-modal'
// import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  const requireAuthentication = pageProps.requireAuthentication
  Modal.setAppElement('#root');

  return (
    <SessionProvider session={session}>
      <div id="root">
        <Layout>
          {requireAuthentication ? (

            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </div>
    </SessionProvider>
  )
}


function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}



export default MyApp
