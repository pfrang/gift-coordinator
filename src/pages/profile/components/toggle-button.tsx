import React from "react";
import styled from "styled-components";

const Button = styled.button<{ onClick?: any; children?: React.ReactNode }>`
  font-size: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  height: 100%;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: background-color 200ms linear;
  :hover {
    background-color: #be185d8b;
  }
`;

const HighlightedButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #be185d;
  height: 100%;
  transition: background-color 200ms linear;
  :hover {
    background-color: #be185d8b;
  }
`;

function ToggleButton(props) {
  return (
    <>
      {props.chosenLobbyType === props.choice ? (
        <HighlightedButtonWrapper>
          <Button onClick={() => props.onClick(props.choice)}>
            {props.text}
          </Button>
        </HighlightedButtonWrapper>
      ) : (
        <ButtonWrapper>
          <Button onClick={() => props.onClick(props.choice)}>
            {props.text}
          </Button>
        </ButtonWrapper>
      )}
    </>
  );
}

export default ToggleButton;
