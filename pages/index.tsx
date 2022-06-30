import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import mongoDB from '../sql-nodejs/cosmosdb/app'
import Button from './components/Buttons/Button'


const Home: NextPage = (props) => {

  const router = useRouter();

  const [userData, setUserData] = useState()
  const db = new mongoDB
  const { data: session, status} = useSession()

  useEffect(() => {
    if(status === 'authenticated') {
      const dbResponse = async () => {
        // const query = `SELECT c.id from c IN Items.children where c.email = '${session.user.email}'`
        const query = `SELECT * from c IN c.users where c.email = '${session.user.email}'`
        const response = await db.read(query).then((data) => data.resources)
        return response
      }
      dbResponse()
    }
  },[status])

  const onClick = (e) => {
    const val = e.currentTarget.innerHTML
    if (val === 'Join') {
      router.push('/join')
    } else if (val === 'Create') {
      router.push('/create')
    } else {
      console.error("dont mess with the DOM values bro")
    }

  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex justify-center items-center h-full'>
        <div>
          <h2 className='text-center'>Join or create a lobby !</h2>
          <div className='border-2'>
            <Button onClick={onClick} text={'Join'} />
            <Button onClick={onClick} text={'Create'} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
