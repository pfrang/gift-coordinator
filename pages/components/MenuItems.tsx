import { useRouter } from 'next/router';
import React from 'react';

function MenuItems(props) {

  const router = useRouter()



  return (
    <li>
      <a href={router.basePath + props.items} className='border-2 cursor-pointer hover:border-b-2 p-2 hover:border-b-indigo-500'>{props.items}</a>
    </li>
  );
}

export default MenuItems;
