import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import MenuItems from './MenuItems';


function Header(props) {
  const { data: session, status } = useSession()
  const [dropdown, setDropdown] = useState(false);

  const arr = ["Profile", session ? "Logout" : "Login"]
  const router = useRouter();
  const lobbyId = router.asPath.split("/").pop().replace('?', '')

  return (
    <header className='border-b-2 bg-slate-200 h-20 flex items-center w-full'>
      <div className='mx-5 my-auto'>
        <Link href="/">
          <h3 className='border-b-4 rounded-sm cursor-pointer text-3xl hover:border-b-2 hover:border-b-indigo-500'>gift c🎁🎁rdinator</h3>
        </Link>
      </div>
      <nav className='ml-auto mx-5'>
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
