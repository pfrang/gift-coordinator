import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import mongoDB from '../../sql-nodejs/cosmosdb/app';
import { removeDuplicateObjectsInArray } from '../../utils/removeDuplicateObjectInArray';
import Button from '../components/Buttons/Button';
import Marginx20Div from '../components/StylingDivs/Divs/MarginX20Div';
import ToggleButton from './components/ToggleButton';

const ItemsTable = styled.div`
 display: grid;
 width: 100%;
 `

const ContainerItemTable = styled.div`
  border-left: 2px solid black;
  border-right: 2px solid black;
  width: 800px;
  max-height: 200px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
  width: 20px;
  background-color: #705151;
  }
  ::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
}
::-webkit-scrollbar-thumb {
  background: #484646;
}
 `

const ItemTable = styled.div`
 padding: 5px;
 width: 100%;
 border-bottom: 2px solid black;
 cursor: pointer;
 transition: background-color 500ms linear;
 :hover {
  background-color: #b2adad;
 }
 `

 interface ResponseProps {
   ownerResponse: Record<string, string>[];
   startedMakingAListResponse: Record<string, string>[];
 }
interface ProfileProps {
 response: ResponseProps;
}

function Profile({response}: ProfileProps) {

  const [createdLobbies, setCreatedLobbies] = useState(response.ownerResponse)
  const [startedMakingAListLobbies, setStartedMakingAListLobbies] = useState(response.startedMakingAListResponse)
  const [chosenLobbyType, setChosenLobbyType] = useState('')

  const db = new mongoDB
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  const router = useRouter();

  const handleRouting = (id) => {
    router.push(`lobby/${id}`)
  }

  return (
    <Marginx20Div>
      <div className='flex flex-col gap-6 justify-center items-center h-full'>
        <div className='border-2 rounded-md bg-[#0d1e45ef]'>
          <ToggleButton text='Laget' choice='made' onClick={setChosenLobbyType} />
          <ToggleButton text='Invitert' choice='invited' onClick={setChosenLobbyType} />
          <ToggleButton text='Startet å lage list i' choice='created' onClick={setChosenLobbyType} />
        </div>
        <div>
          <ItemsTable>
            {chosenLobbyType === 'made' ?
              <ContainerItemTable>
                {createdLobbies &&
                  createdLobbies.map((item, idx) =>
                    <ItemTable key={idx}>
                      <h5>
                        {item.description}
                      </h5>
                    </ItemTable>
                  )}
              </ContainerItemTable>
              :
              <ContainerItemTable>
                <ul>
                  {startedMakingAListLobbies && startedMakingAListLobbies.map(
                    (item, idx) =>
                      <ItemTable onClick={() => handleRouting(item.id)} key={idx}>
                        <h5>
                          {item.description}
                        </h5>
                      </ItemTable>)
                  }
                </ul>
              </ContainerItemTable>
            }
          </ItemsTable>
        </div>
        <div className='block'>
          <Button onClick={() => signOut({ callbackUrl: "/" })} text={"Logg ut"}></Button>
        </div>
      </div>
    </Marginx20Div>
  );
}

export default Profile;


export async function getServerSideProps({req}) {

  const db = new mongoDB

  const session = await getSession({req});

  const response = await fetchLobbyOwnerships(db, session)

  return {
    props: {
      response,
      requireAuthentication: true
    }
  }
}


const fetchLobbyOwnerships = async (db, session) => {
  const ownerQuery = `SELECT * from c where c.creator = '${session.user.email}'`;
  const ownerResponse = await db.read(ownerQuery).then((data) => data.resources);
  const startedMakingAListQuery = `SELECT c.id, c.description FROM c JOIN t in c.users WHERE t.email = '${session.user.email}'`;
  const startedMakingAListResponse = await db.read(startedMakingAListQuery).then((data) => removeDuplicateObjectsInArray(data.resources));
  return {
      ownerResponse,
      startedMakingAListResponse
  }
}
