import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import mongoDB from '../sql-nodejs/cosmosdb/app';
import { removeDuplicateObjectsInArray } from '../utils/removeDuplicateObjectInArray';
import Button from './components/Buttons/Button';
import Marginx20Div from './components/StylingDivs/Divs/MarginX20Div';

function Profile(props) {

  const [createdLobbies, setCreatedLobbies] = useState([])
  const [belongingLobbies, setBelongingLobbies] = useState([])

  const db = new mongoDB
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  useEffect(() => {
    if (status === 'authenticated') {
      const dbResponse = async () => {
        const query = `SELECT * from c where c.creator = '${session.user.email}'`;
        const response = await db.read(query).then((data) => data.resources);
        setCreatedLobbies(response);
        const query2 = `SELECT c.id, c.description FROM c JOIN t in c.users WHERE t.email = '${session.user.email}'`;
        const response2 = await db.read(query2).then((data) => removeDuplicateObjectsInArray(data.resources));
        setBelongingLobbies(response2);

      }
      dbResponse()
    }
  }, [status])

  return (
    <Marginx20Div>
      <div className='flex justify-between'>
        <div className='flex flex-col items-center'>
          <h4>Lobbies you created</h4>
          <ul>
            {createdLobbies && createdLobbies.map((item, idx) => <li className='underline' key={idx}><Link key={idx} href={`lobby/${item.id}`}><a>{item.description}</a></Link></li>)}
          </ul>
        </div>
        <div className='flex flex-col items-center'>
          <h4>Lobbies you have started making a list in</h4>
          <ul>
            {belongingLobbies && belongingLobbies.map((item, idx) => <li className='underline' key={idx}><Link key={idx} href={`lobby/${item.id}`}><a>{item.description}</a></Link></li>)}
          </ul>
        </div>
      </div>
      <Button onClick={() => signOut({callbackUrl: "/"})} text={"Logg ut"}></Button>
    </Marginx20Div>
  );
}

export default Profile;
