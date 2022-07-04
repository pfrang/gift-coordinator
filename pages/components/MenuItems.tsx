import { useRouter } from 'next/router';
import React from 'react';

function MenuItems(props) {

  const router = useRouter()
  return (
      <li onClick={() => router.push(props.items)} className='border-2 cursor-pointer'>{props.items}</li>
  );
}

export default MenuItems;
