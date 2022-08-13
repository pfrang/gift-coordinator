import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Icons } from '../../../Icons/Icons';

function ListItem({ user, item, onDelete, idx, onReserve, onRemoveReservation }) {

  const { data: session, status } = useSession();

  return (
    <div id={`item-${idx}`} className='px-2 flex justify-between -mx-4 border-t-2 border-black'>
      <div className='align-middle'>
        <h5 className='pl-2'>
          {item?.description}
        </h5>
      </div>
      {session?.user.email === user ?
        <div className='flex gap-2 text-slate-200 align-middle'>
          <button className='cursor-pointer' onClick={() => console.log("yo")}>
            {Icons.EDITPEN}
          </button>
          <button onClick={() => onDelete(idx)}>
            {Icons.GARBAGE}
          </button>
        </div>
        : item.reserved ?
          <div className='align-middle'>
            <p className='text-xs'>{`Reserved by ${item.reserved_by}`}</p>
            {item.reserved_by === session.user.email && <svg id={idx} onClick={() => onRemoveReservation(idx)} className='cursor-pointer absolute -right-6 top-0' version="1.1" x="0px" y="0px" width="27.332px" height="27.332px" viewBox="0 0 27.332 27.332" xmlSpace="preserve">
              <path d="M25.832,0H1.5C0.671,0,0,0.671,0,1.5v24.332c0,0.829,0.671,1.5,1.5,1.5h24.332c0.828,0,1.5-0.671,1.5-1.5V1.5   C27.332,0.671,26.66,0,25.832,0z M24.332,24.332H3V3h21.332V24.332z M4.999,13.666c0-1.104,0.896-2,2-2h13.334c1.104,0,2,0.896,2,2   c0,1.104-0.896,2-2,2H6.999C5.895,15.666,4.999,14.77,4.999,13.666z" />
            </svg>}
          </div>
          :
          <div className='align-middle'>
            <button className='rounded-md shadow-md bg-pink-700 hover:bg-pink-800 p-2 text-xs' onClick={() => onReserve(idx)}><h5>Reserver?</h5></button>
          </div>
      }
    </div>
  );
}

export default ListItem;
