import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react';
import mongoDB from '../../sql-nodejs/cosmosdb/app';
import ItemTable from '../components/ItemTable';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

export default function LobbyPage(props) {
  const [invite, setInvite] = useState(false)
  const [edit, setEdit] = useState(true)
  const [boolState, setBoolState] = useState(true)
  const [showClickStartbtn, setShowClickStartbtn] = useState(false)
  const [isAdmin, setisAdmin] = useState(false)
  const [users, setUsers] = useState(props.response.users)
  const [editVal, setEditVal] = useState(props.response.description)

  const db = new mongoDB
  const router = useRouter();
  const lobbyId = router.asPath.split("/").pop().replace('?', '')
  const { data: session } = useSession()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  useEffect(() => {
    if(status === 'authenticated') {
      const foundUser = users.find((user) => user.email === session?.user.email)
      if (!foundUser) {
        setShowClickStartbtn(true)
      } else {
        setShowClickStartbtn(false)
      }
    }
  },[session, users])

  const onClick = async (e) => {
    const query = {
      lobbyId: lobbyId,
      email: session.user.email,
      name: (session.user.email.split(".")[0])
    }
    const response = await db.addNewUser(query)
    const newUser = response.resource.users[response.resource.users.length - 1]
    setUsers([newUser, ...users])
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

  const addItem = () => {
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
          <FontAwesomeIcon icon={faEdit} style={{ fontSize: 5, height: 30, marginTop: 4 }} onClick={addItem} />
        </div>
        <div>
        </div>
        <button className="h-12 p-2 mt-2 w-[100px] border-2 rounded-lg bg-green-500 hover:bg-green-700 text-white text-xs" onClick={() => setInvite((prevState) => !prevState)}>
          Invite friend
        </button>
      </div>
      {showClickStartbtn &&
        <div className='flex items-center justify-center'>
          <h1>You havent made a wish list yet !</h1>
          <button className="h-12 p-2 mt-2 w-[100px] border-2 rounded-lg bg-green-500 hover:bg-green-700 text-white text-xs" onClick={onClick}>
            Click here to start creating one !
          </button>
        </div>
      }
      <div className='px-10 py-10 grid grid-cols-6 grid-rows-2 gap-12 content-center'>
        {users && users.map((user, idx) => {
          return <ItemTable user={user.email} items={user.items} userIndex={idx} key={idx} />
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(params: any) {
  // Fix server side authentication
  const db = new mongoDB;
  const { lobby } = params.query;
  const query = `SELECT * from c where c.id = '${lobby}'`;
  const response = await db.read(query).then((data) => data.resources[0])
  return {
    props: { response }
  }
}
