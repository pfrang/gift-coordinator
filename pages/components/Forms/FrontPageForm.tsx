import React from 'react';

import mongoDB from '../../../sql-nodejs/cosmosdb/app'
import { useRouter } from 'next/router';




function FrontPageForm(props) {

  const router = useRouter()
  const db = new mongoDB


  const onSubmitJoin = async (e) => {
    e.preventDefault()
    const val = e.target.children[0].value
    console.log(val)
    console.log(typeof parseInt(val, 10))
    const response = await db.read(`SELECT * from c where c.id = '${val}'`);
    const id = response.resources[0].id
    router.push(`/lobby/${id}`)
  }
  const onSubmitCreate = async (e) => {
    e.preventDefault()
    const id = e.target.children[0].value
    const lobby = {
      id: id
    }
    const response = await db.insert(lobby);
    router.push(`/lobby/${id}`)
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
