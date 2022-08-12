import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Button from '../Buttons/Button';

const GridRow2 = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  `

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  grid-gap: 20px;
  `

const ButtonTextAndArrowWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`

function LeftSide(props) {

  const router = useRouter()

  const onClick = (e) => {
    router.push("/create")
  }

  return (
    <GridRow2>
      <div className='flex flex-col gap-5 py-12'>
        <h3 className='text-3xl'>Koordiner innkjøp på en felles platform</h3>
        <h5 className='text-sm'>Lag en lobby basert på et event, f.eks Jul 2022 og inviter familie/venner/bekjente som skal kjøpe gaver til hverandre</h5>
      </div>
      <GridRow2>
        <div className='flex h-full'>
          <ButtonsWrapper>
            <div className='border-2 p-4 border-blue-700 rounded-md shadow-md flex flex-col justify-between'>
              <div className='flex flex-col gap-2'>
                <h5 className='text-md'>Opprett lobby her</h5>
                <p className='text-xs'>Trykk på knappen under for å opprette en lobby du kan invtere vennter til</p>
              </div>
              <div onClick={onClick} className='rounded-sm shadow-md cursor-pointer bg-blue-700 hover:bg-blue-800'>
                <ButtonTextAndArrowWrapper>
                  <button className='border-r-2 border-slate-400 font-medium text-sm w-full px-5 py-1.5'>
                    <p>Create</p>
                  </button>
                  <svg className='fill-slate-300 mx-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 12l-20 12 7.289-12-7.289-12z" /></svg>
                </ButtonTextAndArrowWrapper>
              </div>
            </div>
            <div className='border-2 p-4 border-pink-700 rounded-md shadow-md flex flex-col justify-between'>
              <div className='flex flex-col gap-2'>
                <h5 className='text-md'>Hvordan fungerer det?</h5>
                <p className='text-xs'>Trykk på knappen under for å se en kortfattet film om hvordan man lager lobby, inviterer venner, reserverer gjenstander fra andre og hvordan det vil se ut for de andre.</p>
              </div>
              <div onClick={onClick} className='cursor-pointer rounded-sm shadow-md bg-pink-700 hover:bg-pink-800'>
                <ButtonTextAndArrowWrapper>
                  <button onClick={onClick} className='border-r-2 border-slate-400 font-medium text-sm w-full py-1.5 text-center'>
                    <p>Se video her</p>
                  </button>
                  <svg className='fill-slate-300 mx-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 12l-20 12 7.289-12-7.289-12z" /></svg>
                </ButtonTextAndArrowWrapper>
              </div>
            </div>
          </ButtonsWrapper>
        </div>
      </GridRow2>
    </GridRow2>
  );
}

export default LeftSide;
