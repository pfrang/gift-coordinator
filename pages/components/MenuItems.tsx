import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function MenuItems(props) {

  const [invalidProfileDirect, setInvalidProfileDirect ] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const redirect = (e) => {
    switch (props.items) {
      case 'profile':
        !session ?
          setInvalidProfileDirect(true)
        : router.push('/profile')
        return
      case "login":
        return signIn()
      case "logout":
        return signOut()
      default:
        return ""
    }
  }

  return (
    <li id={props.items}>
      <button onClick={redirect}className='border-2 cursor-pointer hover:border-b-2 p-2 hover:border-b-indigo-500'>{props.items}</button>
      {invalidProfileDirect && <h2 className='absolute top-12 right-16 text-red-500'>Please log in</h2>}
    </li>
  );
}

export default MenuItems;
