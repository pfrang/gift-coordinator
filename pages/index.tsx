import type { NextPage } from 'next'
import Head from 'next/head'
import FrontPage from './components/FrontPage'


const Home: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FrontPage />
    </>
  )
}

export default Home
