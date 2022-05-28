import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


function Header(props) {

  const pattern = /lobby/
  const router = useRouter();
  const lobbyId = router.asPath.split("/").pop().replace('?', '')

  return (
    <header className='p-2 border-b-2 flex justify-between w-full'>
      <Link href="/">
        <h3 className='border-b-4 rounded-sm cursor-pointer text-3xl'>gift c🎁🎁rdinator</h3>
      </Link>
      <h3 className='text-3xl'>{pattern.test(router.asPath) ? `Invite a friend?` : ""}</h3>
    </header>
  );
}

export default Header;
