import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import styled from 'styled-components';
import mongoDB from '../../../sql-nodejs/cosmosdb/app';
import { toFindDuplicates } from '../../../utils/findDuplicates';
import { useCurrentUser } from '../../../context/context';

const ModalWrapper = styled.div`
  background-color: #f9fafb;
  height: 100%;
  padding: 1rem;
  display: grid;
  grid-template-rows: 1fr auto;
  `

function AddItemModal({ addModalIsOpen, setAddModalIsOpen, userIndex, setUsers, editItemIndex, setEditItemIndex }) {
  const [titleText, setTitleText] = useState('');
  const [quantityItem, setQuantityItem] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [linkItem, setLinkItem] = useState('');

  useEffect(() => {
    if (editItemIndex.description) {
      setTitleText(editItemIndex.description);
      setQuantityItem(editItemIndex.quantity);
      setItemPrice(editItemIndex.price);
      setLinkItem(editItemIndex.link);
    } else {
      setTitleText('');
      setQuantityItem('');
      setItemPrice('');
      setLinkItem('');
    }
  }, [editItemIndex])

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

  const updateUsersFrontEnd = (edit) => {
    setUsers((prev) => {
      let users = [...prev]

      let info = {};

      if(edit) {
        let currentItemInfo = users[userIndex].items[editItemIndex.idx]
        info = {
          ...currentItemInfo,
          description: titleText,
          price: itemPrice,
          quantity: quantityItem,
          link: linkItem,
          id: editItemIndex
        }
        users[userIndex].items[editItemIndex.idx] = info
      } else {
        info = {
          description: titleText,
          price: itemPrice,
          quantity: quantityItem,
          link: linkItem,
          id: currentUser.items.length
        }
        users[userIndex].items.push(info);
      }

      return users
    })
  }

  const editItem = async () => {

    const info = {
      lobbyId: lobbyId,
      userIndex: userIndex,
      itemIndex: editItemIndex.idx,
      description: titleText,
      link: linkItem,
      quantity: quantityItem,
      price: itemPrice,
    }

    updateUsersFrontEnd(true);
    const updateCosmo = await db.updateItem(info);
    return updateCosmo
  }

  const addItem = async () => {
    const info = {
      lobbyId: lobbyId,
      userIndex: userIndex,
      itemIndex: currentUser.items.length,
      description: titleText,
      link: linkItem,
      quantity: quantityItem,
      price: itemPrice,
      reserved: false,
      reservedBy: ""
    }

    updateUsersFrontEnd(false);
    const updateCosmo = await db.addNewItem(info)
    return updateCosmo
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

    let itemUpdate;
    if(editItemIndex.description) {
      itemUpdate = editItem()
    } else {
      itemUpdate = addItem()
    }
    closeModal();
    return itemUpdate;
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
              <input onChange={(e) => setTitleText(e.target.value)} required className='p-1 border-2 w-full' type="text" name="title" id="" value={titleText} />
              <div className='grid grid-cols-2 gap-2'>
                <div className='border-2 flex flex-col justify-center text-center'>
                  <label className='cursor-pointer' htmlFor="avatar"><p>Last opp bilde</p></label>
                  <input className='w-full hidden' onChange={onChange} type="file"
                    id="avatar" name="avatar"
                    accept="image/png, image/jpeg"></input>
                </div>
                <div>
                  <label htmlFor='quantity'><p>Antall</p></label>
                  <input onChange={(e) => setQuantityItem(e.target.value)} className='p-1 border-2 w-full' pattern="[0-9]+" type="number" name="quantity" id="" value={quantityItem} />
                  <label htmlFor='price'><p>Pris</p></label>
                  <input onChange={(e) => setItemPrice(e.target.value)} className='p-1 border-2 w-full' pattern="\d*" type="number" name="quantity" id="" value={itemPrice} />
                </div>
              </div>
              <div>
                <label htmlFor='link'><p>Link</p></label>
                <input onChange={(e) => setLinkItem(e.target.value)} className='p-1 border-2 w-full' type="text" name="link" id="" value={linkItem} />
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
