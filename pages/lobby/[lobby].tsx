import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react';
import mongoDB from '../../sql-nodejs/cosmosdb/app';
import LobbyForm from '../components/Forms/LobbyForm';
import ItemTable from '../components/ItemTable';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import Email from 'next-auth/providers/email';

export default function LobbyPage(props) {
  const [invite, setInvite] = useState(false)
  const [edit, setEdit] = useState(true)
  const [findUser, setFindUser] = useState(false)
  const description = props.response.description

  const db = new mongoDB
  const router = useRouter();
  const lobbyid = router.asPath.split("/").pop().replace('?', '')
  const { data: session } = useSession()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  const [editVal, setEditVal] = useState(description)

  const users = props.response.users

  const lobbyId = router.asPath.split("/").pop().replace('?', '')

  useEffect(() => {
    if (status === 'authenticated') {
      const find = users.find(item => item.email === session.user.email)
      setFindUser(find)
    }
  })

  const onClick = async (e) => {
    const query = {
      id: lobbyid,
      email: session.user.email,
      name: (session.user.email.split(".")[0])
    }
    const response = await db.addNewUser(query)
    console.log(response)
    router.reload()
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const query = {
      id: lobbyId,
      description: editVal
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
    inputField.focus()
    inputField.select()
  }
  return (
    <div>
      <div className='px-10 flex border-2 h-[80px] justify-between items-center align-middle'>
        {session && <h1>Welcome {session.user.email}</h1>}
        <div className='flex'>
          <form onSubmit={onSubmit} className='h-8'>
            <input className='cursor-default border-b-2' onChange={(e) => { setEditVal(e.target.value) }} value={editVal} type="text" name="input2" id="input" maxLength={20} />
            <input type="submit" value="" />
          </form>
          <FontAwesomeIcon icon={faEdit} style={{ fontSize: 5, height: 30, marginTop: 4 }} onClick={onEditClick} />
        </div>
        <div>
        </div>
        <button className="h-12 p-2 mt-2 w-[100px] border-2 rounded-lg bg-green-500 hover:bg-green-700 text-white text-xs" onClick={() => setInvite((prevState) => !prevState)}>
          Invite friend
        </button>
      </div>
      {findUser ? "" :
        <div className='flex items-center justify-center'>
          <h1>You havent made a wish list yet !</h1>
          <button className="h-12 p-2 mt-2 w-[100px] border-2 rounded-lg bg-green-500 hover:bg-green-700 text-white text-xs" onClick={onClick}>
            Click here to start creating one !
          </button>
        </div>
      }
      <div className='px-10 py-10 grid grid-cols-6 grid-rows-2 gap-12 content-center'>
        {users && users.map((user, idx) => {
          return <ItemTable name={user.name} items={user.items} index={idx} key={idx} />
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
