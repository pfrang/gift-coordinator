import styled from "styled-components";

import LeftSide from "./components/front-page/left-side";
import RightSide from "./components/front-page/right-side";

const ContentWrapper = styled.div`
  margin: 0px 8rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  max-height: 80%;
  @media (max-width: 1460px) {
    margin: 0px 3rem;
  }

  @media (max-width: 1280px) {
    margin: 0px 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 0px 2rem;
  }
`;

export const Home = (props) => {
  return (
    <ContentWrapper>
      {/* <div id="root">
        <AddItemOfflineModal
          addModalIsOpen={addModalIsOpen}
          setAddModalIsOpen={setAddModalIsOpen}
        />

        <button
          className="rounded-md shadow-md bg-pink-700 hover:bg-pink-800 p-2 text-xs"
          onClick={() => setAddModalIsOpen(true)}
        >
          <h5>Legg til ønske</h5>
        </button>
      </div> */}
      <LeftSide />
      <RightSide />
    </ContentWrapper>
  );
};

export default Home;
