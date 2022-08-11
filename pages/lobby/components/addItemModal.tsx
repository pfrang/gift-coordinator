import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import mongoDB from '../../../sql-nodejs/cosmosdb/app';
import { toFindDuplicates } from '../../../utils/findDuplicates';
import { useCurrentUser } from '../../context/context';


function AddItemModal({ addModalIsOpen, setAddModalIsOpen, userIndex, setUsers }) {

  const db = new mongoDB

  const router = useRouter();

  const { currentUser, setCurrentUser } = useCurrentUser();

  const lobbyId = router.asPath.split("/").pop().replace('?', '');

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      width: 350,
      height: 200,
    },
  };


  function closeModal() {
    setAddModalIsOpen(false);
  }

  const onChange = () => {
    const input = document.querySelector("input[type=file]");
    console.log(input);

  }

  const checkifItemAlreadyExists = (input) => {
    const item = document.getElementById(`list-${userIndex}`)
    const li = Array.from(item.getElementsByTagName("li"))
    const liValues = li.map((item) => {
      return item.innerText
    })
    const response = toFindDuplicates(liValues, input)
    return response
  }


  const changeUsers = (input) => {
    setUsers((prev) => {
      let users = [...prev]

      users[userIndex].items.push({description: input})

      return users
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const input = e.target.children[0].value
    if (!input) {
      return
    }

    if (checkifItemAlreadyExists(input)) {
      alert('You already have that item on your list')
      e.target.children[0].value = ""
      return
    }

    changeUsers(input)


    e.target.children[0].value = ""

    const info = {
      lobbyId: lobbyId,
      userIndex: userIndex,
      itemIndex: currentUser.items.length,
      item: input,
      reserved: false,
      reservedBy: ""
    }

    const updateCosmo = await db.updateItems(info)
    return updateCosmo
  }


  return (
    <>
      <Modal
        isOpen={addModalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <form className='flex flex-col ' onSubmit={onSubmit}>
            <input className='border-b-2 p-1' type="text" name="" id="" />
            <div>
              <label htmlFor="avatar">Choose a profile picture:</label>
              <input className='w-full' onChange={onChange} type="file"
                id="avatar" name="avatar"
                accept="image/png, image/jpeg"></input>
            </div>
            <input className='border-2 border-rounded hover:bg-sky-700 cursor-pointer' type="submit" value="Submit" />
        </form>

      </Modal>
    </>
  );
}

export default AddItemModal;
