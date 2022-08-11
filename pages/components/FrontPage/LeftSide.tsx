import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Button from '../Buttons/Button';

function LeftSide(props) {

  const router = useRouter()

  const onClick = (e) => {
    router.push("/create")
  }

  const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  `

  const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  grid-gap: 20px;
  `

  const ButtomHalfWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  `

  return (
    <Wrapper>
      <div className='flex flex-col gap-5'>
        <h3 className='text-3xl'>Koordiner innkjøp på en felles platform</h3>
        <p className='text-sm'>Lag en lobby basert på et event, f.eks Jul 2022 og inviter familie/venner/bekjente som skal kjøpe gaver til hverandre</p>
      </div>
      <ButtomHalfWrapper>
        <ButtonsWrapper>


          <div className='border-2 p-4 border-blue-700 rounded-md shadow-md flex flex-col gap-10'>
            <div className='flex flex-col gap-2'>
              <h5 className='text-md'>Opprett lobby her</h5>
              <p className='text-xs'>Trykk på knappen under for å opprette en lobby du kan invtere vennter til</p>
            </div>
            <Button onClick={onClick} text={'Create ->'} />
          </div>

          <div className='border-2 p-4 border-pink-700 rounded-md shadow-md flex flex-col gap-10'>
            <div className='flex flex-col gap-2'>
              <h5 className='text-md'>Opprett lobby her</h5>
              <p className='text-xs'>Trykk på knappen under for å opprette en lobby du kan invtere vennter til</p>
            </div>
            <button onClick={onClick} className='text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm w-full px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Create -></button>
          </div>
        </ButtonsWrapper>
      </ButtomHalfWrapper>
    </Wrapper>
  );
}

export default LeftSide;
