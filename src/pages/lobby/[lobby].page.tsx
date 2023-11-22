import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import MongoDB from "../../sql-nodejs/cosmosdb/app";
import { useCurrentUser } from "../../context/context";
import { NextApiClient } from "../api/next-api.client";

import AddItemModal from "./components/add-item-modal";
import InviteModalButton from "./components/invite-modal-button";
import ItemTable from "./components/item-table";
import InviteModal from "./components/invite-modal";

export interface Item {
  id: number;
  description: string;
  price: string;
  link: string;
  img: string;
  reserved: boolean;
  reserved_by: string;
}
export interface User {
  name: string;
  email: string;
  items: Array<Item>;
}

export interface LobbyProps {
  response: {
    id: string;
    description: string;
    creator: string;
    users: Array<User>;
  };
}

const PageWrapper = styled.div`
  margin: 0px 8rem;
  @media (max-width: 768px) {
    margin: 0px 2rem;
  }
  @media (max-width: 480px) {
    margin: 0px 1rem;
  }
`;

const ExtendedHeaderDiv = styled.div`
  /* margin-left: -8rem;
  margin-right: -8rem; */
  /* padding-left: -1rem; */
  margin-left: -0.25rem;
  background-color: #0d1e45ef;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  /* padding: 0px 8rem; */
  /* @media (max-width: 768px) {
    padding: 0px 2rem;
    margin-left: -2rem;
    margin-right: -2rem;
  }
  @media (max-width: 480px) {
    padding: 0px 1rem;
    margin-left: -1rem;
    margin-right: -1rem;
  } */
`;

const TwoColumnLayout = styled.div`
  display: grid;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  gap: 3rem;
  align-content: center;

  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (max-width: 1100px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    /* grid-template-columns: repeat(1, minmax(0, 1fr));
    width: 80%; */
  }
`;

export default function LobbyPage({ response }: LobbyProps) {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [edit, setEdit] = useState(true);
  const [showClickStartbtn, setShowClickStartbtn] = useState(true);
  const [users, setUsers] = useState(response.users);
  const [editVal, setEditVal] = useState(response.description);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [currentUsersList, setCurrentUsersList] = useState(undefined);
  const [userIndex, setUserIndex] = useState(0);
  const [editItemIndex, setEditItemIndex] = useState({});

  const [currentUserData, setCurrentUserData] = useState<User | null>(null);

  const db = new MongoDB();

  const apiClient = new NextApiClient();

  const creator = response.creator;
  const router = useRouter();
  const lobbyId = router.asPath.split("/").pop().replace("?", "");

  useEffect(() => {
    if (!currentUser.email) {
      router.push(`/login?callbackUrl=lobby/${lobbyId}`);
    }
  }, []);

  useEffect(() => {
    if (currentUser.email && users) {
      const foundUser = users.find((user) => user.email === currentUser.email);
      const userIndex = users.indexOf(foundUser, 0);

      if (foundUser) {
        setShowClickStartbtn(false);
        setUserIndex(userIndex);
        setCurrentUserData(foundUser);
      } else {
        setShowClickStartbtn(true);
      }
    }

    if (!addModalIsOpen) {
      setEditItemIndex({});
    }
  }, [currentUser, users, addModalIsOpen]);

  const addUser = async (e) => {
    const query = {
      lobbyId: lobbyId,
      email: currentUser.email,
      name: currentUser.email.split("@")[0],
    };
    const response = await db.addNewUser(query);
    const newUser = response.resource.users[0];

    setUsers([newUser, ...users]);
    const reval = await apiClient.axiosInstance.get(
      `/api/revalidate?path=${lobbyId}`
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const query = {
      id: lobbyId,
      description: editVal,
    };
    try {
      const response = await db.updateLobbyDescription(query);
    } catch (e) {
      console.error(e, "error");
    }
    setEdit(true);
    const inputField = document.getElementById("input");
    const reval = await apiClient.axiosInstance.get(
      `/api/revalidate?path=${lobbyId}`
    );
    inputField.blur();
  };

  const changeLobbyName = () => {
    setEdit(false);
    const inputField = document.getElementById("input") as HTMLInputElement;
    inputField.focus();
    inputField.select();
  };

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div id="root">
      <div className="px-1">
        {/* <InviteModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} /> */}
        <AddItemModal
          editItemIndex={editItemIndex}
          setUsers={setUsers}
          userIndex={userIndex}
          addModalIsOpen={addModalIsOpen}
          setAddModalIsOpen={setAddModalIsOpen}
          currentUsersList={currentUsersList}
          currentUserData={currentUserData}
        />
        <ExtendedHeaderDiv>
          <div className="flex h-8 gap-1">
            {creator === currentUser.email ? (
              <>
                <form onSubmit={onSubmit} className="">
                  <input
                    className="cursor-default text-slate-200 bg-[#0d1e45ef]"
                    onChange={(e) => {
                      setEditVal(e.target.value);
                    }}
                    value={editVal}
                    type="text"
                    name="input2"
                    id="input"
                    maxLength={20}
                  />
                  <input type="submit" value="" />
                </form>
                <div className="align-middle">
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{
                      fontSize: 5,
                      verticalAlign: "middle",
                      marginTop: 5,
                      height: 30,
                      color: "white",
                    }}
                    onClick={changeLobbyName}
                  />
                </div>
              </>
            ) : (
              <div>
                <h5>
                  Opprettet av <br /> {creator}
                </h5>
              </div>
            )}
          </div>
          {/* {currentUser.email && <h4>{editVal}</h4>} */}
          {/* <InviteModalButton setShowModal={openModal}>
            Invite friend
          </InviteModalButton> */}
        </ExtendedHeaderDiv>
        {showClickStartbtn && (
          <div className="flex items-center justify-center gap-5">
            <h4>You havent made a wish list yet !</h4>
            <button
              className="h-12 p-2 mt-2 w-[100px] border-2 rounded-lg bg-green-500 hover:bg-green-700 text-white text-xs"
              onClick={addUser}
            >
              Click here to start !
            </button>
          </div>
        )}
        <TwoColumnLayout>
          {users &&
            users.map((user, idx) => {
              return (
                <ItemTable
                  setEditItemIndex={setEditItemIndex}
                  setAddModalIsOpen={setAddModalIsOpen}
                  users={users}
                  setUsers={setUsers}
                  user={user}
                  userIndex={idx}
                  key={idx}
                  setCurrentUsersList={setCurrentUsersList}
                />
              );
            })}
        </TwoColumnLayout>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const db = new MongoDB();
  const query = `SELECT * from c`;
  const items = await db.read(query).then((data) => data.resources);

  const paths = items.map((item) => ({
    params: { lobby: item.id },
  }));

  return {
    paths,
    fallback: "blocking", // can also be true or false
  };
}

export async function getStaticProps(context) {
  const lobby = context.params.lobby;

  const db = new MongoDB();
  const query = `SELECT * from c where c.id = '${lobby}'`;
  const response = await db.read(query).then((data) => data.resources[0]);

  if (!response) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      response,
      // requireAuthentication: true,
    },
  };
}
