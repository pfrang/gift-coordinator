import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import styled from 'styled-components';
import mongoDB from '../../../sql-nodejs/cosmosdb/app';
import { toFindDuplicates } from '../../../utils/findDuplicates';
import { useCurrentUser } from '../../context/context';

const ModalWrapper = styled.div`
  background-color: #f9fafb;
  height: 100%;
  padding: 1rem;
  display: grid;
  grid-template-rows: 1fr auto;
  `

function AddItemModal({ addModalIsOpen, setAddModalIsOpen, userIndex, setUsers }) {
  const [titleText, setTitleText] = useState('');
  const [quantityItem, setQuantityItem] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [linkItem, setLinkItem] = useState('');

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
    },
    overlay: {
      background: "#091738b3"
    }
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

      users[userIndex].items.push({ description: input })

      return users
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!titleText) {
      return
    }

    if (checkifItemAlreadyExists(titleText)) {
      alert('You already have that item on your list')
      e.target.children[0].value = ""
      return
    }

    changeUsers(titleText)

    const info = {
      lobbyId: lobbyId,
      userIndex: userIndex,
      itemIndex: currentUser.items.length,
      item: titleText,
      link: linkItem,
      quantity: quantityItem,
      price: itemPrice,
      reserved: false,
      reservedBy: ""
    }
    closeModal();
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
      >
        <form className='relative'>
          <div onClick={closeModal} className='cursor-pointer absolute top-0 right-2'>
            X
          </div>
          <ModalWrapper>
            <div className='flex flex-col gap-2'>
              <label htmlFor='title'><p>Tittel</p></label>
              <input onChange={(e) => setTitleText(e.target.value)} className='p-1 border-2 w-full' type="text" name="title" id="" />
              <div className='grid grid-cols-2 gap-2'>
                <div className='border-2 flex flex-col justify-center text-center'>
                  <label className='cursor-pointer' htmlFor="avatar"><p>Last opp bilde</p></label>
                  <input className='w-full hidden' onChange={onChange} type="file"
                    id="avatar" name="avatar"
                    accept="image/png, image/jpeg"></input>
                </div>
                <div>
                  <label htmlFor='quantity'><p>Antall</p></label>
                  <input onChange={(e) => setQuantityItem(e.target.value)} className='p-1 border-2 w-full' type="number" name="quantity" id="" />
                  <label htmlFor='price'><p>Pris</p></label>
                  <input onChange={(e) => setItemPrice(e.target.value)}  className='p-1 border-2 w-full' type="number" name="quantity" id="" />
                </div>
              </div>
              <div>
                <label htmlFor='link'><p>Link</p></label>
                <input onChange={(e) => setLinkItem(e.target.value)} className='p-1 border-2 w-full' type="text" name="link" id="" />
              </div>
            </div>
            <button onClick={onSubmit} className='mt-2 cursor-pointer rounded-md shadow-md bg-pink-700 hover:bg-pink-800 text-slate-200 p-2' type="submit" value="Submit">Legg til</button>
          </ModalWrapper>
        </form>
      </Modal>
    </>
  );
}

export default AddItemModal;
