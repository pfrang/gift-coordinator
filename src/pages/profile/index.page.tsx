import { Session } from 'next-auth';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Buttons/Button';
import Marginx20Div from '../components/StylingDivs/Divs/MarginX20Div';
import ToggleButton from './components/ToggleButton';
import { useMongoDB } from './hooks/use-profile-mongodb';
import { UserLobbyData } from '../api/mongodb/mongo-db-sl-api-client/mongo-db-api-client';
import LobbyList from './components/LobbyList';
import { Spinner } from '../../ui-kit/loader/loader2';

const ItemsTable = styled.div`
  height: 200px;
  overflow: hidden;
  border: 2px solid #aeabab;
  width: 800px;
  position: relative;
 `

interface ResponseProps {
  ownerResponse: Record<string, string>[];
  startedMakingAListResponse: Record<string, string>[];
  lobbiesInvitedToResponse: Record<string, string>[]
}
interface ProfileProps {
  response: ResponseProps;
}

interface UserProps {
  user: {
    email: string;
    image: string;
    name: string;
  }
}
interface User {
  user: UserProps;
  expires: string;
}

interface UserHookResponse {
  response: UserLobbyData;
}


interface UserHookData {
  data: UserHookResponse;
  isLoading: boolean;
  error: any;
}


function Profile({ user }: User) {

  const [createdLobbies, setCreatedLobbies] = useState(undefined)
  const [startedMakingAListLobbies, setStartedMakingAListLobbies] = useState(undefined)
  const [lobbiesInvitedTo, setLobbiesInvitedTo] = useState(undefined)
  const [chosenLobbyType, setChosenLobbyType] = useState('contain')


  const { data, isLoading, error }: UserHookData = useMongoDB(user)

  const { status } = useSession();

  useEffect(() => {
    if (isLoading) return;

    if (status === 'authenticated') {
      setCreatedLobbies(data.response.userResponse)
      setStartedMakingAListLobbies(data.response.userStartedToMakeAList)
      setLobbiesInvitedTo(data.response.userLobbiesInvitedTo)
    }

  }, [isLoading, data, status])

  return (
    <Marginx20Div>
      <div>
        <h5>
          {`Logget inn som ${user.user.email}`}
        </h5>
      </div>
      <div className='flex h-full justify-center items-center'>
        <div className='flex flex-col gap-6 justify-center items-center h-full'>
          <h5>Lobbyer du har...</h5>
          <div className='flex justify-center items-center border-2 rounded-md bg-[#20325aed]'>
            <ToggleButton chosenLobbyType={chosenLobbyType} text='En liste i' choice='contain' onClick={setChosenLobbyType} />
            <ToggleButton chosenLobbyType={chosenLobbyType} text='Blitt invitert til' choice='invited' onClick={setChosenLobbyType} />
            <ToggleButton chosenLobbyType={chosenLobbyType} text='Laget' choice='created' onClick={setChosenLobbyType} />
          </div>
          {!isLoading ?
            <ItemsTable>
              {chosenLobbyType === 'created' ?
                <LobbyList lobbies={createdLobbies} />
                : chosenLobbyType === 'contain' ?
                  < LobbyList lobbies={startedMakingAListLobbies} />
                  :
                  <LobbyList lobbies={lobbiesInvitedTo} />
              }
            </ItemsTable>
            :
            <ItemsTable>
              <Spinner />
            </ItemsTable>}
          <div className='block'>
            <Button onClick={() => signOut({ callbackUrl: "/" })} text={"Logg ut"}></Button>
          </div>
        </div>
      </div>
    </Marginx20Div>
  );
}

export default Profile;


export async function getServerSideProps({ req }) {

  const user: Session = await getSession({ req });

  return {
    props: {
      user,
      requireAuthentication: true
    }
  }
}
