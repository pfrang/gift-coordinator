import React from 'react'
import styled from 'styled-components'

type Props = {}

export default function RightSide({}: Props) {

  const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
  `
  return (
    <Wrapper>
      <p>🎁🎁</p>
      <Wrapper>
        <Wrapper>
          <div>

          </div>
          <p className='text-xs'>Bli kvitt stresset med å sende melding til hele slekta for å høre om den og den tingen kan kjøpes.</p>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  )
}
