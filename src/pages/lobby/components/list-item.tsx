import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Icons } from "../../../icons/icons";
import Button from "../../components/buttons/button";
import { Item, User } from "../[lobby].page";
import { useCurrentUser } from "../../../context/context";

interface ListItemProps {
  setEditItemIndex: (any) => void;
  setAddModalIsOpen: (boolean) => void;
  onDelete: (idx) => void;
  onReserve: (idx) => void;
  onRemoveReservation: (idx) => void;
  setCurrentUsersList: (user) => void;
  idx: number;
  user: User;
  item: Item;
}

function ListItem({
  user,
  item,
  onDelete,
  idx,
  onReserve,
  onRemoveReservation,
  setEditItemIndex,
  setAddModalIsOpen,
  setCurrentUsersList,
}: ListItemProps) {
  const { currentUser } = useCurrentUser();

  const router = useRouter();

  const openEditModal = () => {
    setAddModalIsOpen(true);
    setCurrentUsersList(user);
    setEditItemIndex({ ...item, idx });
  };

  const lobbyId = router.asPath.split("/").pop().replace("?", "");
  return (
    <tr className="border-t-2 border-slate-400 h-12">
      <td className="">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => openEditModal()}
        >
          <div className="flex relative">
            <h5 className="pl-2">{item?.description}</h5>
            {currentUser.email !== user.email && (
              <>
                <div className="absolute w-4 -right-6 hover:bg-white cursor-pointer">
                  <Image src="/svg/information.svg" height={50} width={50} />
                </div>
              </>
              // </div>
            )}
          </div>
          {item.img && (
            <div className="m-1 h-12">
              <img
                className={"object-contain w-full h-full"}
                src={`${process.env.NEXT_PUBLIC_BLOB_STORAGE_ENDPOINT}${lobbyId}/${item.img}`}
              />
            </div>
          )}
        </div>
      </td>
      {user.email === currentUser.email ? (
        <>
          <td className="1-3">
            {/* <div className='flex gap-2 text-slate-200 align-middle'> */}
            <button className="cursor-pointer" onClick={() => openEditModal()}>
              {Icons.EDITPEN}
            </button>
          </td>
          <td className="1-3">
            <button onClick={() => onDelete(idx)}>{Icons.GARBAGE}</button>
          </td>
        </>
      ) : item.reserved ? (
        <>
          <td className="w-1/3">
            <p className="text-xs px-5 break-words">{`Reservert av ${
              item.reserved_by.split("@")[0]
            }`}</p>
            {/* // ${item.reserved_by.split("@")[0]}`} */}
          </td>
          <td className="w-1/3">
            {item.reserved_by === currentUser.email && (
              <button
                className="rounded-md shadow-md bg-pink-700 hover:bg-pink-800 p-2 text-xs"
                onClick={() => onRemoveReservation(idx)}
              >
                <h5>Fjern reservasjon?</h5>
              </button>
            )}
          </td>
        </>
      ) : (
        <>
          <td className="w-1/3">
            <p className="text-xs px-5">Ikke reservert</p>
          </td>
          <td className="w-1/3">
            <button
              className="rounded-md shadow-md bg-pink-700 hover:bg-pink-800 p-2 text-xs"
              onClick={() => onReserve(idx)}
            >
              <h5>Reserver?</h5>
            </button>
          </td>
        </>
      )}
    </tr>
  );
}

export default ListItem;
