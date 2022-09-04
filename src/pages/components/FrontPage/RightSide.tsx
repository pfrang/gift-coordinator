import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'


type Props = {}

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    width: 100%;
  `

const ImageContainer = styled.div`
  padding-top: 2rem;
  position: relative;
  height: 400px;
  width: 400px;
  margin: 0px auto;
  @media(max-width: 1280px) {
    height: 300px;
    width: 300px;
  }
  `


export default function RightSide({ }: Props) {

  return (
    <Wrapper>
      <ImageContainer>
        <Image src={'/images/Gifts.png'} alt="gifts" objectFit='cover' layout='fill' />
      </ImageContainer>
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
