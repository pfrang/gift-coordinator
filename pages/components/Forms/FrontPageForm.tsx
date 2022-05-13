import React from 'react';

import { useRouter } from 'next/router';




function FrontPageForm(props) {

  const router = useRouter()

  const onSubmitJoin = (e) => {
    e.preventDefault()
    const val = e.target.children[0].value
    router.push(`/lobby/${val}`)
  }
  const onSubmitCreate = (e) => {
    e.preventDefault()
    const val = e.target.children[0].value
    router.push(`/lobby/${val}`)
  }



  return (
    <div className='flex justify-center items-center '>

      <form onSubmit={onSubmitJoin}>
        <input type="text" name="" id="" placeholder='skriv' />
        <input type="submit" value="Join Lobby" />
      </form>
      <form onSubmit={onSubmitCreate}>
        <input type="text" name="" id="" placeholder='skriv' />
        <input type="submit" value="Lag Lobby" />
      </form>
    </div>
  );
}

export default FrontPageForm;
