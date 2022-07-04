import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Icons } from '../Icons/Profile';


function Header(props) {
  const { data: session, status } = useSession()

  const router = useRouter();
  const lobbyId = router.asPath.split("/").pop().replace('?', '')

  return (
    <header className='p-2 border-b-2 flex justify-between w-full'>
      <Link href="/">
        <h3 className='border-b-4 rounded-sm cursor-pointer text-3xl'>gift c🎁🎁rdinator</h3>
      </Link>
      <div className='flex justify-between items-center w-28 '>
        <Link href="/profile">
          {Icons.PROFILE}
        </Link>
        {session ?
          <>
            <button onClick={() => signOut()}>Sign out</button>
          </>
          : <button className='bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400' onClick={() => signIn()}>Sign in</button>}
      </div>
    </header>
  );
}

export default Header;
