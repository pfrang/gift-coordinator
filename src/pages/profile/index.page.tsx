import { Session } from "next-auth";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Button from "../components/buttons/button";
import { UserLobbyData } from "../api/mongodb/mongo-db-sl-api-client/mongo-db-api-client";
import { Spinner } from "../../ui-kit/spinner/spinner";
import { useCurrentUser } from "../../context/context";
import { CookieStorage } from "../cookie/token-storage";
import { useShouldHydrate } from "../utils/should-hydrate";

import ToggleButton from "./components/toggle-button";
import { useMongoDB } from "./hooks/use-profile-mongodb";
import LobbyList from "./components/lobby-list";

const ItemsTable = styled.div`
  height: 200px;
  overflow: hidden;
  border: 2px solid #aeabab;
  width: 100%;
  position: relative;
`;

const Wrapper = styled.div``;

interface ResponseProps {
  ownerResponse: Record<string, string>[];
  startedMakingAListResponse: Record<string, string>[];
  lobbiesInvitedToResponse: Record<string, string>[];
}
interface ProfileProps {
  response: ResponseProps;
}

interface UserProps {
  user: {
    email: string;
    image: string;
    name: string;
  };
}
interface User {
  user: UserProps;
  expires: string;
}

interface UserHookResponse {
  response: UserLobbyData;
}

interface UserHookData {
  data: UserHookResponse;
  isLoading: boolean;
  error: any;
}

function Profile() {
  const [createdLobbies, setCreatedLobbies] = useState(undefined);
  const [startedMakingAListLobbies, setStartedMakingAListLobbies] =
    useState(undefined);
  const [lobbiesInvitedTo, setLobbiesInvitedTo] = useState(undefined);
  const [chosenLobbyType, setChosenLobbyType] = useState("contain");
  const { currentUser, logOut } = useCurrentUser();

  const { data, isLoading, error }: UserHookData = useMongoDB(currentUser);

  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (currentUser.email && data) {
      setCreatedLobbies(data.response.userResponse);
      setStartedMakingAListLobbies(data.response.userStartedToMakeAList);
      setLobbiesInvitedTo(data.response.userLobbiesInvitedTo);
    }
  }, [isLoading, data, currentUser]);

  const onLogout = () => {
    new CookieStorage().deleteCookie();
    logOut();
    router.push("/");
  };

  return (
    <div>
      <div>
        <h5>{`Logget inn som ${currentUser.email}`}</h5>
      </div>
      <div className="flex h-full justify-center items-center">
        <div className="flex flex-col gap-6 justify-center items-center h-full">
          <h5>Lobbyer du har...</h5>
          <div className="flex justify-center items-center border-2 rounded-md bg-[#20325aed]">
            <ToggleButton
              chosenLobbyType={chosenLobbyType}
              text="En liste i"
              choice="contain"
              onClick={setChosenLobbyType}
            />
            <ToggleButton
              chosenLobbyType={chosenLobbyType}
              text="Blitt invitert til"
              choice="invited"
              onClick={setChosenLobbyType}
            />
            <ToggleButton
              chosenLobbyType={chosenLobbyType}
              text="Laget"
              choice="created"
              onClick={setChosenLobbyType}
            />
          </div>
          {!isLoading ? (
            <ItemsTable>
              {chosenLobbyType === "created" ? (
                <LobbyList lobbies={createdLobbies} />
              ) : chosenLobbyType === "contain" ? (
                <LobbyList lobbies={startedMakingAListLobbies} />
              ) : (
                <LobbyList lobbies={lobbiesInvitedTo} />
              )}
            </ItemsTable>
          ) : (
            <ItemsTable>
              <Spinner />
            </ItemsTable>
          )}
          <div className="block">
            <Button onClick={() => onLogout()} text={"Logg ut"}></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
