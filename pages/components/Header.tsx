import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Icons } from '../Icons/Profile';
import MenuItems from './MenuItems';


function Header(props) {
  const { data: session, status } = useSession()
  const [dropdown, setDropdown] = useState(false);

  const arr = ["profile", session ? "logout" : "login" ]
  const router = useRouter();
  const lobbyId = router.asPath.split("/").pop().replace('?', '')

  return (
    <header className='p-2 border-b-2 bg-slate-200 flex justify-between w-full'>
      <Link href="/">
        <h3 className='border-b-4 rounded-sm cursor-pointer text-3xl'>gift c🎁🎁rdinator</h3>
      </Link>
      <nav>
        <ul className='border-2 w-28 flex items-center relative'>
          {arr.map((menu, index) => {
            return <MenuItems dropdown={dropdown} items={menu} key={index} />
          })}
        </ul>

      </nav>
    </header>
  );
}

export default Header;
