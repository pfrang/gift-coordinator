import Email from 'next-auth/providers/email';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function MenuItems(props) {

  const [invalidProfileDirect, setInvalidProfileDirect] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const redirect = (e) => {
    switch (props.items) {
      case 'Profile':
        !session ?
          setInvalidProfileDirect(true)
          : router.push('/profile')
        return
      case "Login":
        return signIn()
      case "Logout":
        return signOut()
      case "Home":
        router.push('/');
      default:
        return ""
    }
  }

  return (
    <li className='p-2 cursor-pointer' id={props.items}>
        <a onClick={redirect} className='text-sm'>{props.items}</a>
        {invalidProfileDirect && <p className='my-2 whitespace-nowrap absolute w-10 top-8 right-18 text-sm flex text-red-500'>Please log in</p>}
    </li>
  );
}

export default MenuItems;
