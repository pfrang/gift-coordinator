import Link from 'next/link';
import React from 'react';
import MarginX20Div from './components/StylingDivs/Divs/MarginX20Div';

function FourOhFour(props) {
  return (
    <MarginX20Div>
      <div className='flex flex-col h-full justify-center items-center'>
        <p>Denne siden eksisterer ikke</p>
        <br/>
        <Link href="/">
          <p className='underline cursor-pointer'>Returner til hjemmesiden?</p>
        </Link>
      </div>
    </MarginX20Div>
  );
}

export default FourOhFour;
