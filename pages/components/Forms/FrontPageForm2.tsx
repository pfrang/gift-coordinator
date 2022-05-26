import { useRouter } from 'next/router';
import React, { useState } from 'react';
import mongoDB from '../../../sql-nodejs/cosmosdb/app';


function FrontPageForm2(props) {

  const [text, setText] = useState('');

  const router = useRouter()
  const db = new mongoDB

  const onSubmit = async (e) => {
    e.preventDefault()
    const type = e.target.value
    if(type === 'Back') {
      props.lobbyDesc(false);
    } else if (type === 'Create') {
      const query = {
        id: props.id,
        name: text
      }
      db.updateLobbyDescription(query)
      router.push(`/lobby/${props.id}`)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <label htmlFor="Lobby" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lobby Description</label>
        <input onChange={(e) => setText(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Lobby Description" required />
        <p id="error" className='text-rose-400 text-sm'></p>
      </div>
      <div className='flex justify-between'>
        <button onClick={onSubmit} type="submit" value="Back" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back</button>
        <button onClick={onSubmit} type="submit" value="Create" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
      </div>
    </form>
  );
}

export default FrontPageForm2;
