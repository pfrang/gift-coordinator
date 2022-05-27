import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faE, faEdit } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react';
import mongoDB from '../../sql-nodejs/cosmosdb/app';
import LobbyForm from '../components/Forms/LobbyForm';
import ItemTable from '../components/ItemTable';
import { useRouter } from 'next/router';


export default function LobbyPage(props) {
  const [form, setForm] = useState(false)
  const [edit, setEdit] = useState(true)
  const description = props.response.description
  const db = new mongoDB

  const [editVal, setEditVal] = useState(description)

  const elements = props.response.people
  const router = useRouter();

  const lobbyId = router.asPath.split("/").pop().replace('?', '')
  //

  const onSubmit = async (e) => {
    e.preventDefault()
    const query = {
      id: lobbyId,
      name: editVal
    }
    try {
      const response = await db.updateLobbyDescription(query);
      console.log(response)
    } catch(e) {
      console.log(e, "error")
    }
    setEdit(true)
    const inputField = document.getElementById("input")
    inputField.blur()
  }

  const onEditClick = () => {
    setEdit(false)
    const inputField = document.getElementById("input")
    // inputField.addEventListener('change', editVal)
    inputField.focus()
    inputField.select()
  }
  return (
    <div>
      <div className='flex h-[100px] justify-center'>
        {/* <h2 className='text-center text-lg px-4'>{description}</h2> */}
        <form onSubmit={onSubmit} className='h-8'>
          <input className='cursor-default border-b-2' onChange={(e) => { setEditVal(e.target.value) }} value={editVal} type="text" name="input2" id="input" maxLength={20} />
          <input type="submit" value="" />
        </form>
        {/* <input className='border-2' type="text" name="" id="" value={description}/> */}
        <FontAwesomeIcon icon={faEdit} style={{ fontSize: 5, height: 30, marginTop: 4 }} onClick={onEditClick} />
      </div>
      <div className='p-10 grid grid-cols-6 grid-rows-3 gap-12 content-center'>
        <button className="h-8 w-8 text-red-500" onClick={() => setForm((prevState) => !prevState)}>
          <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
        </button>
        {form && <LobbyForm names={elements} val={form} onClick={setForm} />}
        {elements && elements.map((item, idx) => {
          return <ItemTable name={item.name} items={item.items} index={idx} key={idx} />
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(params: any) {
  const db = new mongoDB;
  const { lobby } = params.query;
  const query = `SELECT * from c where c.id = '${lobby}'`;
  const response = await db.read(query).then((data) => data.resources[0])
  return {
    props: { response }
  }
}
