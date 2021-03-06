import React, { useState } from 'react';
import mongoDB from '../sql-nodejs/cosmosdb/app'
import { useRouter } from 'next/router';

function JoinPage() {

  const [id, setID] = useState('');

  const router = useRouter()
  const db = new mongoDB

  const onSubmit = async (e) => {
    e.preventDefault()
    const type = e.target.value
    const regex = new RegExp('^[0-9]{5}$')
    const errorTag = document.getElementById("error")
    if (!regex.test(id)) {
      errorTag.innerHTML = "Please input a 5-digit lobby ID"
      return
    }
    try {
      const response = await db.read(`SELECT * from c where c.id = '${id}'`);
      const lobbyId = response.resources[0].id
      router.push(`/lobby/${lobbyId}`)
    } catch (err) {
      console.error(err)
      errorTag.innerHTML = "Cannot find that lobby"
    }
  }


  return (
    <div className='flex justify-center items-center h-full'>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label htmlFor="Lobby" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lobby</label>
          <input onChange={(e) => setID(e.target.value)} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="5-digit value for lobby ID" required />
          <p id="error" className='text-rose-400 text-sm'></p>
        </div>
          <button onClick={onSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join</button>
      </form>
    </div>
  );
}

export default JoinPage;
