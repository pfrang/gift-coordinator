import { useRouter } from 'next/router';
import React, { useState } from 'react';
import mongoDB from '../../../sql-nodejs/cosmosdb/app';
import ItemTable from '../ItemTable';


function LobbyForm(props) {

  const [name, setName] = useState('')
  const router = useRouter()
  const lobbyid = router.asPath.split("/").pop().replace('?', '')

  const db = new mongoDB
  const onSubmit = async (e) => {
    props.onClick(false)
    const query = {
      id: lobbyid,
      name: name
    }
    const response = await db.updateNewName(query)
    console.log(response)
    router.reload()
  }

  return (
    <div className="mt-2 h-3/5 justify-center content-center">
      <form onSubmit={onSubmit}>
        <div className='mt-0.5 flex align-center'>
          <label htmlFor="Name" className="block text-sm font-sm text-gray-900 dark:text-gray-300"></label>
          <input onChange={(e) => setName(e.target.value)} type="text" className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full text-center p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" required />
          <input type="submit" value="Submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
        </div>
      </form>
    </div>
  );
}

export default LobbyForm;
