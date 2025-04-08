import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { removeNthElement } from "../../../utils/remove-nth-element";
import MongoDB from "../../../sql-nodejs/cosmosdb/app";
import { User } from "../[lobby].page";
import { NextApiClient } from "../../api/next-api.client";
import { useCurrentUser } from "../../../context/context";

import ListItem from "./list-item";

interface ItemTableProps {
  setEditItemIndex: (any) => void;
  setUsers: (prev) => void;
  setAddModalIsOpen: (boolean) => void;
  setCurrentUsersList: (user) => void;
  userIndex: number;
  users: User[];
  user: User;
}

const TableStyle = styled.table<{ id?: string; children?: React.ReactNode }>`
  display: table;
  table-layout: fixed;
  margin-right: -1rem;
  margin-left: -1rem;
  /* width: calc(100% + 2rem); */
  width: 100%;
`;

function ItemTable({
  setEditItemIndex,
  userIndex,
  user,
  users,
  setUsers,
  setAddModalIsOpen,
  setCurrentUsersList,
}: ItemTableProps) {
  const db = new MongoDB();
  const router = useRouter();
  const lobbyId = router.asPath.split("/").pop().replace("?", "");
  const { currentUser, setCurrentUser } = useCurrentUser();

  const [startItems, setStartItems] = useState(user.items);
  const apiClient = new NextApiClient();

  const name = user?.email.split("@")[0];

  useEffect(() => {
    setStartItems(user.items);
  }, [users]);

  const onDelete = async (itemIndex) => {
    const info = {
      id: lobbyId,
      userIndex: userIndex,
      itemIndex: itemIndex,
    };
    const filteredArr = removeNthElement(startItems, itemIndex);

    setUsers((prev) => {
      let users = [...prev];
      users[userIndex].items = filteredArr;
      return users;
    });
    const updateCosmo = await db.deleteItem(info);
    const reval = await apiClient.axiosInstance.get(
      `/api/revalidate?path=${lobbyId}`
    );
    return updateCosmo;
  };

  const onReserve = async (itemIndex) => {
    const info = {
      id: lobbyId,
      userIndex: userIndex,
      reservedBy: currentUser.email,
      itemIndex: itemIndex,
    };

    setStartItems((prev) => {
      let prevData = [...prev];
      prevData[itemIndex].reserved = true;
      prevData[itemIndex].reserved_by = currentUser.email;
      return prevData;
    });

    const updateCosmo = await db.reserveItem(info);
    const reval = await apiClient.axiosInstance.get(
      `/api/revalidate?path=${lobbyId}`
    );
    return updateCosmo;
  };

  const onRemoveReservation = async (itemIndex) => {
    const info = {
      id: lobbyId,
      userIndex: userIndex,
      reservedBy: currentUser.email,
      itemIndex: itemIndex,
    };

    setStartItems((prev) => {
      let prevData = [...prev];
      prevData[itemIndex].reserved = false;
      prevData[itemIndex].reserved_by = "";
      return prevData;
    });

    const updateCosmo = await db.removeReservationItem(info);
    const reval = await apiClient.axiosInstance.get(
      `/api/revalidate?path=${lobbyId}`
    );
    return updateCosmo;
  };

  const openAddModal = () => {
    setAddModalIsOpen(true);
    setCurrentUsersList(user);
  };

  const isCurrentUsersItem = currentUser.email === user.email;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full border-2 border-blue-700 rounded-md shadow-md shadow-xl px-4 py-1 bg-[#0d1e45ef]">
        <div className="flex items-center py-4 justify-between h-12">
          <h5 className="align-middle text-xs whitespace-normal">
            {name}
            {`'s Wish List !`}
          </h5>
          {isCurrentUsersItem && (
            <button
              className="rounded-md shadow-md bg-pink-700 hover:bg-pink-800 p-2 text-xs"
              onClick={() => openAddModal()}
            >
              <h5>Legg til ønske</h5>
            </button>
          )}
        </div>
        <TableStyle id={`list-${userIndex}`}>
          <tbody className="table-row-group text-center">
            {isCurrentUsersItem ? (
              <tr className="table-row border-t-2 border-slate-400">
                <th className="w-1/3">Tittel</th>
                <th className="w-1/3">Rediger</th>
                <th className="w-1/3">Slett</th>
              </tr>
            ) : (
              <tr className="table-row border-t-2 border-slate-400">
                <th className="w-1/3">Tittel</th>
                <th className="w-1/3">Reservert?</th>
                <th className="w-1/3">Reserver</th>
              </tr>
            )}
            {startItems &&
              startItems.map((item, idx) => {
                return (
                  <ListItem
                    setAddModalIsOpen={setAddModalIsOpen}
                    setEditItemIndex={setEditItemIndex}
                    key={idx}
                    user={user}
                    item={item}
                    idx={idx}
                    onDelete={onDelete}
                    onReserve={onReserve}
                    onRemoveReservation={onRemoveReservation}
                    setCurrentUsersList={setCurrentUsersList}
                  />
                );
              })}
          </tbody>
        </TableStyle>
      </div>
    </div>
  );
}

export default ItemTable;
