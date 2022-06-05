import { useRouter } from 'next/router';
import React from 'react';
import Button from './Buttons/Button';

function FrontPage(props) {

  const router = useRouter();

  const onClick = (e) => {
   const val = e.currentTarget.innerHTML
   if(val === 'Join') {
     router.push('/join')
   } else if (val === 'Create') {
     router.push('/create')
   } else {
     console.error("dont mess with the DOM values bro")
   }

  }
  return (
    <div className='flex justify-center items-center h-full'>
      <div>
        <h2 className='text-center'>Join or create a lobby !</h2>
        <div className='border-2'>
          <Button onClick={onClick} text={'Join'} />
          <Button onClick={onClick} text={'Create'} />
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
