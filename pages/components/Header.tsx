import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import MenuItems from './MenuItems';

const HeaderComp = styled.header`
  display: flex;
  height: 5rem;
  width: 100%;
  align-items: center;
  border-bottom: 2px solid black;
  border-style: dashed double;
  `

function Header(props) {


  const { data: session, status } = useSession()

  const arr = ["Home", "Profile", session ? "Logout" : "Login"]
  const router = useRouter();
  const lobbyId = router.asPath.split("/").pop().replace('?', '')

  return (
    <HeaderComp>
      <div className='flex h-full justify-between align-bottom w-full mx-32'>
        <div className='mt-auto'>
          <Link href="/">
            <h2 className='rounded-sm cursor-pointer text-xl py-2'>GiftMe!</h2>
          </Link>
        </div>
        <nav className='mt-auto mr-20'>
          <ul className='flex items-center gap-3 relative'>
            {arr.map((menu, index) => {
              return <MenuItems items={menu} key={index} />
            })}
          </ul>
        </nav>
      </div>
    </HeaderComp>
  );
}

export default Header;
