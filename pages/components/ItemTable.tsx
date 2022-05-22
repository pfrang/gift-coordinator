import React from 'react';
import productFetcher from '../api/hello';
import SortableJS from 'sortablejs';
import mongoDB from '../../sql-nodejs/cosmosdb/app';
import { useRouter } from 'next/router';



function ItemTable(props) {

  const db = new mongoDB
  const router = useRouter()
  const lobbyid = router.asPath.split("/").pop().replace('?', '')

  const populateQuery = (item) => {
    let query;
    if (!props.items) {
      query = {
        id: lobbyid,
        name: props.name,
        items: [item]
      }
    } else {
      query = {
        id: lobbyid,
        name: props.name,
        items: [item, ...props.items]
      }
    }
    return query
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const input = e.target.children[0].value
    e.target.children[0].value = ""
    const list = document.getElementById(`list-${props.index}`)
    list.insertAdjacentHTML("afterbegin", `<li>${input}</li>`)
    // const query = populateQuery(input)
    const updateCosmo = await db.updateItems()
    console.log(updateCosmo)
    // const response = await productFetcher(query)
    // console.log(response)
  }
  return (
    <div className='border-2'>
      <p className='text-rose-600 border-b-2 border-black'><b>{props.name}</b>'s Wish List !</p>
      <ul id={`list-${props.index}`}>
      </ul>
      <form className='relative' onSubmit={onSubmit}>
        <input className='border-4 border-indigo-600 max-w-full' placeholder='Add wish' type="text" name="" id="wish" />
        <label>
          <input type="submit" className='hidden' />
          <svg className="absolute -left-8 top-0 h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
        </label>
      </form>
      {/* <table className="border-collapse">
        <thead>
          <tr className='border-b-4'>
            <th>{props.name}</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr className='relative border-b-4'>
            <td><input className='maw-w-full' type="text" name="" id="" /></td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default ItemTable;
