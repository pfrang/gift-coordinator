import React, { useEffect, useState } from 'react';
import mongoDB from '../../../sql-nodejs/cosmosdb/app';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import ListItem from './ListItem';
import { removeNthElement } from '../../../utils/removeNthElement';
import { toFindDuplicates } from '../../../utils/findDuplicates';
import { useCurrentUserItems, useCurrentUser } from '../../context/context';
import { Icons } from '../../../Icons/Icons';

function ItemTable({ userIndex, items, user, users, setUsers, setAddModalIsOpen }) {

  const db = new mongoDB
  const router = useRouter()
  const lobbyId = router.asPath.split("/").pop().replace('?', '')
  const { data: session, status } = useSession()

  const { currentUser, setCurrentUser } = useCurrentUser();

  const [startItems, setStartItems] = useState(items);

  const name = session.user.email.split("@")[0];

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
      prevData[itemIndex].reserved_by = session.user.email
      return prevData
    })

    const updateCosmo = await db.reserveItem(info)
    return updateCosmo
  }

  const onRemoveReservation = async (itemIndex) => {
    const info = {
      id: lobbyId,
      userIndex: userIndex,
      reservedBy: session.user.email,
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

  const onAddItem = () => {
    setAddModalIsOpen(true)
  }
  return (
    <div className='border-2 border-blue-700 rounded-md shadow-md shadow-xl'>
      <div className='flex border-b-2 border-black items-center p-2 justify-between'>
        <h5 className='align-middle text-sm'><b>{name}</b>{`'s Wish List !`}</h5>
        {
          session && session.user.email === user &&
          <button className='rounded-md shadow-md bg-pink-700 hover:bg-pink-800 p-2 text-xs' onClick={onAddItem}><h5>Legg til ønske</h5></button>
        }
      </div>
      <ul id={`list-${userIndex}`}>
        {startItems && startItems.map((item, idx) => {
          return (
            <ListItem key={idx} user={user} item={item} idx={idx} onDelete={onDelete} onReserve={onReserve} onRemoveReservation={onRemoveReservation} />
          )
        })}
      </ul>
    </div >
  );
}

export default ItemTable;
