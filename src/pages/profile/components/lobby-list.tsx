import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { Icons } from "../../../icons/icons";

function LobbyList({ lobbies }) {
  const router = useRouter();

  const ContainerItemTable = styled.div`
    background-color: #6e87b3;
    max-height: 200px;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 20px;
      background-color: #ada4a4;
    }
    ::-webkit-scrollbar-thumb {
      background: #4a4848;
    }
  `;

  const ItemTable = styled.div`
    padding: 5px;
    width: 100%;
    border-bottom: 2px solid black;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    transition: background-color 500ms linear;
    :hover {
      background-color: #b2adad;
    }
  `;

  const handleRouting = (id) => {
    router.push(`lobby/${id}`);
  };

  return (
    <ContainerItemTable>
      {lobbies &&
        lobbies.map((item, idx) => (
          <ItemTable onClick={() => handleRouting(item.id)} key={idx}>
            <h5>{item.description}</h5>
            {Icons.ARROW}
          </ItemTable>
        ))}
    </ContainerItemTable>
  );
}

export default LobbyList;
