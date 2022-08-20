import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import mongoDB from '../../sql-nodejs/cosmosdb/app';
import { removeDuplicateObjectsInArray } from '../../utils/removeDuplicateObjectInArray';
import Button from '../components/Buttons/Button';
import Marginx20Div from '../components/StylingDivs/Divs/MarginX20Div';
import LobbyList from './components/LobbyList';
import ToggleButton from './components/ToggleButton';

const ItemsTable = styled.div`
background-color: #6e87b3;
 `

interface ResponseProps {
  ownerResponse: Record<string, string>[];
  startedMakingAListResponse: Record<string, string>[];
  lobbiesInvitedToResponse: Record<string, string>[]
}
interface ProfileProps {
  response: ResponseProps;
}

function Profile({ response }: ProfileProps) {

  const [createdLobbies, setCreatedLobbies] = useState(response.ownerResponse)
  const [startedMakingAListLobbies, setStartedMakingAListLobbies] = useState(response.startedMakingAListResponse)
  const [lobbiesInvitedTo, setLobbiesInvitedTo] = useState(response.lobbiesInvitedToResponse)
  const [chosenLobbyType, setChosenLobbyType] = useState('contain')

  const { data: session } = useSession();

  return (
    <Marginx20Div>
      <div>
        <h5>
          {`Logget inn som ${session.user?.email}`}
        </h5>
      </div>
      <div className='flex flex-col gap-6 justify-center items-center h-full'>
        <h5>Lobbyer du har...</h5>
        <div className='flex justify-center items-center border-2 rounded-md bg-[#20325aed]'>
          <ToggleButton chosenLobbyType={chosenLobbyType} text='En liste i' choice='contain' onClick={setChosenLobbyType} />
          <ToggleButton chosenLobbyType={chosenLobbyType} text='Blitt invitert til' choice='invited' onClick={setChosenLobbyType} />
          <ToggleButton chosenLobbyType={chosenLobbyType} text='Laget' choice='created' onClick={setChosenLobbyType} />
        </div>
        <ItemsTable>
          {chosenLobbyType === 'created' ?
            <LobbyList lobbies={createdLobbies} />
            : chosenLobbyType === 'contain' ?
              < LobbyList lobbies={startedMakingAListLobbies} />
              :
              <LobbyList lobbies={lobbiesInvitedTo} />
          }
        </ItemsTable>
        <div className='block'>
          <Button onClick={() => signOut({ callbackUrl: "/" })} text={"Logg ut"}></Button>
        </div>
      </div>
    </Marginx20Div>
  );
}

export default Profile;


export async function getServerSideProps({ req }) {

  const db = new mongoDB

  const session = await getSession({ req });

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
  const lobbiesInvitedTo = `SELECT c.id, c.description FROM c JOIN t in c.invited_users WHERE t.to = '${session.user.email}'`;
  const lobbiesInvitedToResponse = await db.read(lobbiesInvitedTo).then((data) => removeDuplicateObjectsInArray(data.resources));
  return {
    ownerResponse,
    startedMakingAListResponse,
    lobbiesInvitedToResponse
  }
}
