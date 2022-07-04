import { useSession, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import mongoDB from '../sql-nodejs/cosmosdb/app';
import { removeDuplicateObjectsInArray } from '../utils/removeDuplicateObjectInArray';

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
        const query2 = `SELECT c.id FROM c JOIN t in c.users WHERE t.email = '${session.user.email}'`;
        const response2 = await db.read(query2).then((data) => removeDuplicateObjectsInArray(data.resources));
        setBelongingLobbies(response2);

      }
      dbResponse()
    }
  }, [status])

  console.log(belongingLobbies);


  return (
    <div className='flex flex-col flex-end items-center'>
      <div>
        <h2>Lobbies you are part of</h2>
        <ul>
          {belongingLobbies.map((item, idx) => <li className='underline' key={idx}><Link key={idx} href={`lobby/${item.id}`}>{item.id}</Link></li>)}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
