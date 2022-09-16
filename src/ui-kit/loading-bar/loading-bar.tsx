import styled, { keyframes } from "styled-components";

const StyledLoadingBar = styled.div`
  position: relative;
  /* display: flex;
  align-items: center; */
  height: 10px;
  width: 30%;
  border: 10px solid #f4a261;
  border-radius: 15px;
`;

const loadingAnimation = keyframes`
0% { width: 0%}
25% { width: 25%}
50% { width: 50%}
75% { width: 75%}
100% { width: 100%}
`;

const StyledLoadingBarColor = styled.div`
  position: absolute;
  background-color: #ffffff;
  top: -5px;
  width: 0px;
  height: 10px;
  border-radius: 15px;
  animation: ${loadingAnimation} 4s infinite linear;
`;

export const LoadingBar = () => (
  <StyledLoadingBar>
    <StyledLoadingBarColor />
  </StyledLoadingBar>
);
