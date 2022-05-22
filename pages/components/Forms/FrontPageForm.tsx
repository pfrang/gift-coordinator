import React, { useState } from 'react';

import mongoDB from '../../../sql-nodejs/cosmosdb/app'
import { useRouter } from 'next/router';


function FrontPageForm() {


  const [text, setText] = useState('')

  const router = useRouter()
  const db = new mongoDB


  const onSubmit = async (e) => {
    e.preventDefault()
    const type = e.target.value
    const regex = new RegExp('[0-9]{5}$')
    const errorTag = document.getElementById("error")
    if (!regex.test(text)) {
      errorTag.innerHTML = "Please input a 5-digit lobby ID"
      return
    }
    if (type === "Join") {
      try {
        const response = await db.read(`SELECT * from c where c.id = '${text}'`);
        const id = response.resources[0].id
        router.push(`/lobby/${id}`)
      } catch (err) {
        console.error(err)
        errorTag.innerHTML = "Cannot find that lobby"
      }
    }
    else if (type === "Create") {
      const item = {
        id: text
      }
      try {
        const response = await db.createLobby(item);
        router.push(`/lobby/${text}`)
      } catch (err) {
        console.error(err)
        errorTag.innerHTML = `A lobby with id ${text} already exists`
      }
    }
    else {
      console.error("Need Join or Create values")
    }
  }


  return (
    <div className='flex justify-center items-center h-full'>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label htmlFor="Lobby" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lobby</label>
          <input onChange={(e) => setText(e.target.value)} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="5-digit value for lobby ID" required />
          <p id="error" className='text-rose-400 text-sm'></p>
        </div>
        <div className='flex justify-between'>
          <button onClick={onSubmit} type="submit" value="Join" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join</button>
          <button onClick={onSubmit} type="submit" value="Create" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
        </div>
      </form>
    </div>
  );
}

export default FrontPageForm;
