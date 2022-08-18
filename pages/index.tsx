import { useSession } from 'next-auth/react';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import mongoDB from '../sql-nodejs/cosmosdb/app';
import { removeDuplicateObjectsInArray } from '../utils/removeDuplicateObjectInArray';
import LeftSide from './components/FrontPage/LeftSide';
import RightSide from './components/FrontPage/RightSide';

const ContentWrapper = styled.div`
  margin: 0px 8rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  @media(max-width: 1460px) {
      margin: 0px 3rem;
  }

  @media(max-width: 1280px) {
      margin: 0px 1rem;
  }


  @media(max-width: 768px) {
      grid-template-columns: 1fr;
      margin: 0px 2rem;
  }
  `

export const Home = (props) => {
  const [createdLobbies, setCreatedLobbies] = useState([])
  const [belongingLobbies, setBelongingLobbies] = useState([])
  const router = useRouter();
  const db = new mongoDB
  const { data: session, status } = useSession()

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


  return (
    <ContentWrapper>
      <LeftSide />
      <RightSide />
    </ContentWrapper>
  )
}

export default Home
