import styled, { keyframes } from "styled-components";

// import Logo from "./logo.svg";
import Logo from "./test";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Svg = styled(Logo)`
  g {
    stroke-linecap: round;
    stroke-width: 2;
    fill: none;
    stroke-linejoin: round;
    color: "#24062F";
    transform-origin: 12px 12px;
    animation: ${rotate} 0.5s infinite linear;
  }
`;

export const Loader = () => {
  return (
    <div>
      <Svg viewBox="0 0 24 24" className="h-12 w-12">
        <circle cx="12" cy="12" opacity=".4" r="11" />
        <path
          stroke="currentColor"
          data-cap="butt"
          d="M12 1a11 11 0 0 1 11 11"
        />
      </Svg>
    </div>
  );
};
