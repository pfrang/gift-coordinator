import { useRouter } from 'next/router';
import React, { useState } from 'react';
import mongoDB from '../../../sql-nodejs/cosmosdb/app';
import ItemTable from '../ItemTable';


function LobbyForm(props) {

  const [name, setName] = useState('')
  const router = useRouter()
  const lobbyid = router.asPath.split("/").pop()

  const db = new mongoDB
  const onSubmit = async (e) => {
    e.preventDefault()
    props.onClick(false)
    const item = {
      id: lobbyid,
      name: [name]
    }
    const response = await db.update(item)
    console.log(response)
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lobby</label>
        <input onChange={(e) => setName(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" required />
        <input type="submit" value="Submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
      </div>
    </form>
  );
}

export default LobbyForm;
