
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
 font-size: 0.75rem;
 padding: 0.5rem;
 transition: background-color 200ms linear;
 :hover {
  background-color: #b2adad;
 }
 `


function ToggleButton(props) {
  return (
    <Button onClick={() => props.onClick(props.choice)}>{props.text}</Button>
  );
}

export default ToggleButton;
