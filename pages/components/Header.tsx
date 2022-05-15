import { useRouter } from 'next/router';
import React from 'react';


function Header(props) {

  const router = useRouter()
  return (
    <div>
      {router.asPath !== "/" ? `Welcome to lobby ${router.asPath.split("/").pop().replace('?', '')}` : "Test header"}
    </div>
  );
}

export default Header;
