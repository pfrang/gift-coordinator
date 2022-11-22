import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Icons } from "../../../icons/icons";
import Button from "../../components/buttons/button";
import { Item, User } from "../[lobby].page";

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
  const { data: session, status } = useSession();

  const router = useRouter();

  const [enlargeImage, setEnlargeImage] = useState(false);

  const openEditModal = () => {
    setAddModalIsOpen(true);
    setCurrentUsersList(user);
    setEditItemIndex({ ...item, idx });
  };

  const lobbyId = router.asPath.split("/").pop().replace("?", "");
  return (
    <tr className="border-t-2 border-slate-400 h-12">
      <td className="">
        <div className="flex flex-col items-center">
          <div className="flex relative">
            <h5 className="pl-2">{item?.description}</h5>
            {session?.user.email !== user.email && (
              // <div className="absolute -top-2 left-10 w-full hover:text-white cursor-pointer color-white">
              <>
                <div
                  onClick={() => openEditModal()}
                  className="absolute w-4 -top-2 left-10 hover:bg-white cursor-pointer"
                >
                  <Image src="/svg/information.svg" height={50} width={50} />
                </div>
              </>
              // </div>
            )}
          </div>
          {item.img && (
            <div className="m-1 h-12">
              <img
                onClick={() => setEnlargeImage(!enlargeImage)}
                className={
                  enlargeImage
                    ? "absolute bottom-[50%] left-[30%] max-w-[50%] max-h-[70%] cursor-pointer"
                    : "object-contain w-full h-full cursor-pointer"
                }
                src={`${process.env.NEXT_PUBLIC_BLOB_STORAGE_ENDPOINT}${lobbyId}/${item.img}`}
              />
            </div>
          )}
        </div>
      </td>
      {session?.user.email === user.email ? (
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
            <p className="text-xs px-5 break-words">{`Reserved by
            ${item.reserved_by.split("@")[0]}`}</p>
          </td>
          <td className="w-1/3">
            {item.reserved_by === session.user.email && (
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
            <p className="text-xs px-5">Ingen</p>
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
