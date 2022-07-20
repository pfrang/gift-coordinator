import React from 'react';
import styled from 'styled-components'
import { RiCloseLine } from "react-icons/ri";

const OuterDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`

const DarkBG = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const InnerDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ModalDiv = styled.div`
  padding: 10px;
  font-size: 14px;
  color: #2c3e50;
  text-align: center;
`

const CloseBtn = styled.button`
  cursor: pointer;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  color: #2c3e50;
  background: white;
  transition: all 0.25s ease;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.06);
  position: absolute;
  right: 0;
  top: 0;
  align-self: flex-end;
  margin-top: -7px;
  margin-right: -7px;
`

function InviteModal({ setShowModal }) {
  return (
    <>
      <DarkBG onClick={() => setShowModal(false)}>
      <InnerDiv>
        <ModalDiv>
        <CloseBtn onClick={() => console.log("hei")}>
          <RiCloseLine style={{ marginBottom: "-3px" }}/>
        </CloseBtn>
        <form>
          <input type="text" name="" id="" />
          <input type="submit" value="Invite friend!" />
        </form>
        </ModalDiv>
      </InnerDiv>
      </DarkBG>
    </>
  );
}

export default InviteModal;
