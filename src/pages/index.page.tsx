import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

import MongoDB from "../sql-nodejs/cosmosdb/app";

import LeftSide from "./components/front-page/left-side";
import RightSide from "./components/front-page/right-side";
import AddItemModal from "./lobby/components/add-item-modal";
import AddItemOfflineModal from "./lobby/components/add-item-modal-offline";

const ContentWrapper = styled.div`
  margin: 0px 8rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
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
  const [createdLobbies, setCreatedLobbies] = useState([]);
  const [belongingLobbies, setBelongingLobbies] = useState([]);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const router = useRouter();
  // const db = new MongoDB();
  const { data: session, status } = useSession();

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
