import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Icons } from '../../../Icons/Icons';

function ListItem({ user, item, onDelete, idx, onReserve, onRemoveReservation, setEditItemIndex, setAddModalIsOpen }) {

  const { data: session, status } = useSession();

  const openEditModal = () => {
    setAddModalIsOpen(true)
    setEditItemIndex({ ...item, idx })
  }

  return (
    <tr>
      <td className='w-full'>
        <div id={`item-${idx}`} className='px-2 flex justify-between -mx-4 border-t-2 border-black'>
          <div className='align-middle'>
            <h5 className='pl-2'>
              {item?.description}
            </h5>
          </div>
          {session?.user.email === user ?
            <div className='flex gap-2 text-slate-200 align-middle'>
              <button className='cursor-pointer' onClick={() => openEditModal()}>
                {Icons.EDITPEN}
              </button>
              <button onClick={() => onDelete(idx)}>
                {Icons.GARBAGE}
              </button>
            </div>
            : item.reserved ?
              <div className='align-middle flex'>
                <p className='text-xs px-5'>{`Reserved by ${item.reserved_by}`}</p>
                {item.reserved_by === session.user.email &&
                  <button className='rounded-md shadow-md bg-pink-700 hover:bg-pink-800 p-1 text-xs' onClick={() => onRemoveReservation(idx)}><h5>Fjern reservasjon?</h5></button>
                }
              </div>
              :
              <div className='align-middle'>
                <button className='rounded-md shadow-md bg-pink-700 hover:bg-pink-800 p-2 text-xs' onClick={() => onReserve(idx)}><h5>Reserver?</h5></button>
              </div>
          }
        </div>
      </td>
    </tr>
  );
}

export default ListItem;
