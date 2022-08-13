import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react';
import mongoDB from '../../sql-nodejs/cosmosdb/app';
import ItemTable from './components/ItemTable';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import InviteModalButton from './components/InviteModalButton';
import styled from 'styled-components';
import Modal from 'react-modal';
import InviteModal from './components/inviteModal';
import blobStorage from '../../sql-nodejs/blobstorage/app';
import AddItemModal from './components/addItemModal';
import { useCurrentUser } from '../../context/context';

const darkBG = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`

interface Items {
  description: string
}
interface Users {
  name: string,
  email: string,
  items: Array<Items>
}

interface LobbyProps {
  response: {
    id: string,
    description: string,
    creator: string,
    users: Array<Users>
  }
}

const PageWrapper = styled.div`
  margin: 0px 8rem;
  `

const ExtendedHeaderDiv = styled.div`
    margin-left: -8rem;
    margin-right: -8rem;
    background-color: #0d1e45ef;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 0px 8rem;
  `

export default function LobbyPage({ response }: LobbyProps) {

  const [edit, setEdit] = useState(true)
  const [showClickStartbtn, setShowClickStartbtn] = useState(false)
  const [isAdmin, setisAdmin] = useState(false)
  const [users, setUsers] = useState(response.users)
  const [editVal, setEditVal] = useState(response.description)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [userIndex, setUserIndex] = useState(0);

  const { currentUser, setCurrentUser } = useCurrentUser();

  const db = new mongoDB
  const blob = new blobStorage
  const creator = response.creator
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
    if (status === 'authenticated' && users) {
      const foundUser = users.find((user) => user.email === session?.user.email);
      const userIndex = users.indexOf(foundUser, 0);

      if (foundUser) {
        setShowClickStartbtn(false);
        setUserIndex(userIndex);
        setCurrentUser(foundUser);
      } else {
        setShowClickStartbtn(true);
      }
    }
  }, [session, users])

  const addUser = async (e) => {
    const query = {
      lobbyId: lobbyId,
      email: session.user.email,
      name: (session.user.email.split("@")[0])
    }
    const response = await db.addNewUser(query)
    const newUser = response.resource.users[0]

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

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div id="root">
      <PageWrapper>
        <InviteModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
        <AddItemModal setUsers={setUsers} userIndex={userIndex} addModalIsOpen={addModalIsOpen} setAddModalIsOpen={setAddModalIsOpen} />
        <ExtendedHeaderDiv>
          {session && <h4>Welcome {session.user.email}</h4>}
          <div className='flex h-8'>
            {creator === session.user.email ?
              <form onSubmit={onSubmit}>
                <input className='cursor-default border-b-2' onChange={(e) => { setEditVal(e.target.value) }} value={editVal} type="text" name="input2" id="input" maxLength={20} />
                <input type="submit" value="" />
              </form>
              :
              <div className='w-full flex border-b-2 items-center'>
                <p>{editVal}</p>
              </div>}
            {session && session.user.email === creator && <FontAwesomeIcon icon={faEdit} style={{ fontSize: 5, height: 30, marginTop: 4 }} onClick={addItem} />}
          </div>
          <InviteModalButton setShowModal={openModal}>
            Invite friend
          </InviteModalButton>
        </ExtendedHeaderDiv>
        {showClickStartbtn &&
          <div className='flex items-center justify-center'>
            <h1>You havent made a wish list yet !</h1>
            <button className="h-12 p-2 mt-2 w-[100px] border-2 rounded-lg bg-green-500 hover:bg-green-700 text-white text-xs" onClick={addUser}>
              Click here to start !
            </button>
          </div>
        }
        <div className='py-10 grid grid-cols-3 grid-rows-10 gap-12 content-center'>
          {users && users.map((user, idx) => {
            return <ItemTable setAddModalIsOpen={setAddModalIsOpen} users={users} setUsers={setUsers} user={user.email} items={user.items} userIndex={idx} key={idx} />
          })}
        </div>
      </PageWrapper>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context
  const db = new mongoDB;
  const { lobby } = context.query;
  const query = `SELECT * from c where c.id = '${lobby}'`;
  const response = await db.read(query).then((data) => data.resources[0]);

  if (!response) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      response,
      requireAuthentication: true
    }
  }
}
