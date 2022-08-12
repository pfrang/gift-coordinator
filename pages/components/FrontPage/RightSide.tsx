import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'


type Props = {}

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
  `


export default function RightSide({ }: Props) {

  return (
    <Wrapper>
      <div className='text-center py-2'>
      <Image src={'/Gifts.png'} alt="gifts" width="500" height="500" />
      </div>
      <Wrapper>
        <Wrapper>
          <div>
          </div>
          <div className='flex flex-col gap-4'>
            <h5 className='text-sm'>Bli kvitt stresset med å sende melding til hele slekta for å høre om den og den tingen kan kjøpes.</h5>
            <p className='text-xs'>Gjør det enkelt med GiftMe hvor uendelig mange personer kan befinne seg i samme lobby og reservere ønsker fra hverandre.</p>
          </div>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  )
}
