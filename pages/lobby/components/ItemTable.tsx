import React, { useEffect, useState } from 'react';
import mongoDB from '../../../sql-nodejs/cosmosdb/app';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import ListItem from './ListItem';
import { removeNthElement } from '../../../utils/removeNthElement';
import styled from 'styled-components';

const TableStyle = styled.table`
  display: table;
  table-layout: fixed;
  margin-right: -1rem;
  margin-left: -1rem;
  width: calc(100% + 2rem);
  `

function ItemTable({ setEditItemIndex, userIndex, items, user, users, setUsers, setAddModalIsOpen }) {

  const db = new mongoDB
  const router = useRouter()
  const lobbyId = router.asPath.split("/").pop().replace('?', '')
  const { data: session, status } = useSession();

  const [startItems, setStartItems] = useState(items);

  const name = user.split("@")[0];

  useEffect(() => {
    setStartItems(items);
  }, [users]);

  const onDelete = async (itemIndex) => {
    const info = {
      id: lobbyId,
      userIndex: userIndex,
      itemIndex: itemIndex
    }
    const filteredArr = removeNthElement(startItems, itemIndex);

    setUsers((prev) => {
      let users = [...prev];
      users[userIndex].items = filteredArr;
      return users;
    })
    const updateCosmo = await db.deleteItem(info)
    return updateCosmo
  }

  const onReserve = async (itemIndex) => {
    const info = {
      id: lobbyId,
      userIndex: userIndex,
      reservedBy: session.user.email,
      itemIndex: itemIndex
    }

    setStartItems((prev) => {

      let prevData = [...prev]
      prevData[itemIndex].reserved = true
      prevData[itemIndex].reserved_by = session?.user.email
      return prevData
    })

    const updateCosmo = await db.reserveItem(info)
    return updateCosmo
  }

  const onRemoveReservation = async (itemIndex) => {
    const info = {
      id: lobbyId,
      userIndex: userIndex,
      reservedBy: session?.user.email,
      itemIndex: itemIndex
    }

    setStartItems((prev) => {

      let prevData = [...prev]
      prevData[itemIndex].reserved = false
      prevData[itemIndex].reserved_by = ""
      return prevData
    })

    const updateCosmo = await db.removeReservationItem(info)
    return updateCosmo
  }


  return (
    <div>
      <div className='border-2 border-blue-700 rounded-md shadow-md shadow-xl px-4 py-1'>
      <div className='flex items-center py-4 justify-between h-12'>
        <h5 className='align-middle text-xs'>{name}{`'s Wish List !`}</h5>
        {
          session && session.user.email === user &&
          <button className='rounded-md shadow-md bg-pink-700 hover:bg-pink-800 p-2 text-xs' onClick={() => setAddModalIsOpen(true)}><h5>Legg til ønske</h5></button>
        }
      </div>
      <TableStyle id={`list-${userIndex}`}>
        <tbody className='table-row-group text-center'>
          {session && session.user.email === user ?
            <tr className='table-row border-t-2 border-slate-400'>
              <th className='w-1/3'>Tittel</th>
              <th className='w-1/3'>Rediger</th>
              <th className='w-1/3'>Slett</th>
            </tr>
            :
            <tr className='table-row border-t-2 border-slate-400'>
              <th className='w-1/3'>Tittel</th>
              <th className='w-1/3'>Reservert av</th>
              <th className='w-1/3'>Reserver</th>
            </tr>
          }
          {startItems && startItems.map((item, idx) => {
            return (
              <ListItem setAddModalIsOpen={setAddModalIsOpen} setEditItemIndex={setEditItemIndex} key={idx} user={user} item={item} idx={idx} onDelete={onDelete} onReserve={onReserve} onRemoveReservation={onRemoveReservation} />
            )
          })}
        </tbody>
      </TableStyle>
      </div>
    </div>
  );
}

export default ItemTable;
