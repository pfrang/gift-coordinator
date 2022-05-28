import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react';
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
    } catch (e) {
      console.log(e, "error")
    }
    setEdit(true)
    const inputField = document.getElementById("input")
    inputField.blur()
  }

  const onEditClick = () => {
    setEdit(false)
    const inputField = document.getElementById("input") as HTMLInputElement
    // inputField.addEventListener('change', editVal)
    inputField.focus()
    inputField.select()
  }
  return (
    <div>
      <div className='px-10 flex h-[100px] justify-between'>
        <div className='flex'>
          <button className="h-10 p-2 mt-2 w-[100px] border-2 rounded-lg bg-green-500 hover:bg-green-700 text-white text-xs" onClick={() => setForm((prevState) => !prevState)}>
            Add Person
          </button>
          {form && <LobbyForm names={elements} val={form} onClick={setForm} />}
        </div>
        <div className={form ? 'hidden' : 'flex'}>
          <form onSubmit={onSubmit} className='h-8'>
            <input className='cursor-default border-b-2' onChange={(e) => { setEditVal(e.target.value) }} value={editVal} type="text" name="input2" id="input" maxLength={20} />
            <input type="submit" value="" />
          </form>
          <FontAwesomeIcon icon={faEdit} style={{ fontSize: 5, height: 30, marginTop: 4 }} onClick={onEditClick} />
        </div>
        <div>
        </div>
      </div>

      <div className='px-10 grid grid-cols-6 grid-rows-2 gap-12 content-center'>
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
