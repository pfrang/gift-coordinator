import { useSession } from 'next-auth/react';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import mongoDB from '../sql-nodejs/cosmosdb/app';
import { Loader } from '../ui-kit/loader/loader';
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

  return (
    <ContentWrapper>
      <LeftSide />
      <RightSide />
    </ContentWrapper>
  )
}

export default Home
