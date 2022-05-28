import React from 'react';
import mongoDB from '../../sql-nodejs/cosmosdb/app';
import { useRouter } from 'next/router';



function ItemTable(props) {

  const db = new mongoDB
  const router = useRouter()
  const lobbyid = router.asPath.split("/").pop().replace('?', '')

  const onSubmit = async (e) => {
    e.preventDefault()
    const input = e.target.children[0].value
    e.target.children[0].value = ""
    const list = document.getElementById(`list-${props.index}`)
    list.insertAdjacentHTML("beforeend", `<li>${input}</li>`)
    const info = {
      id: lobbyid,
      index: props.index,
      item: input
    }

    const updateCosmo = await db.updateItems(info)
    console.log(updateCosmo)
    return updateCosmo

    // const response = await productFetcher(query)
    // console.log(response)
  }
  return (
    <div className='border-2'>
      <p className='text-rose-600 border-b-2 border-black'><b>{props.name}</b>'s Wish List !</p>
      <ul id={`list-${props.index}`}>
        {props.items && props.items.map((item,idx) => {
          return <li className='border-b-2' key={idx}>{item.description}</li>
        }) }
      </ul>
      <form className='relative' onSubmit={onSubmit}>
        <input className='border-4 border-indigo-600 max-w-full' placeholder='Add wish' type="text" name="" id="wish" />
        <label>
          <input type="submit" className='hidden' />
          <svg className="absolute -left-8 top-0 h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
        </label>
      </form>
    </div>
  );
}

export default ItemTable;
