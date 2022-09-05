import { useSession } from "next-auth/react";
import React from "react";

import { Icons } from "../../../icons/icons";

function ListItem({
  user,
  item,
  onDelete,
  idx,
  onReserve,
  onRemoveReservation,
  setEditItemIndex,
  setAddModalIsOpen,
}) {
  const { data: session, status } = useSession();

  const openEditModal = () => {
    setAddModalIsOpen(true);
    setEditItemIndex({ ...item, idx });
  };

  return (
    <tr className="border-t-2 border-slate-400 h-12">
      <td className="1-3">
        <h5 className="pl-2">{item?.description}</h5>
      </td>
      {session?.user.email === user ? (
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
            <p className="text-xs px-5 break-words">{`Reserved by ${
              item.reserved_by.split("@")[0]
            }`}</p>
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