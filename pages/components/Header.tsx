import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Icons } from '../Icons/Profile';
import MenuItems from './MenuItems';


function Header(props) {
  const { data: session, status } = useSession()
  const [dropdown, setDropdown] = useState(false);

  const arr = ["profile"]
  const router = useRouter();
  const lobbyId = router.asPath.split("/").pop().replace('?', '')

  return (
    <header className='p-2 border-b-2 flex justify-between w-full'>
      <Link href="/">
        <h3 className='border-b-4 rounded-sm cursor-pointer text-3xl'>gift c🎁🎁rdinator</h3>
      </Link>
      <div>
        <button
          aria-expanded={dropdown ? "true" : "false"}
          onClick={() => setDropdown((prev) => !prev)}
        >{"->"}</button>
        <ul className={dropdown ? "block" : "hidden"}>
          {arr.map((menu, index) => {
            return <MenuItems dropdown={dropdown} items={menu} key={index} />
          })}
        </ul>

      </div>
    </header>
  );
}

export default Header;
