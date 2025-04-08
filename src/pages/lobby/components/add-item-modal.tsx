import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSession } from "next-auth/react";

import { toFindDuplicates } from "../../../utils/find-duplicates";
import { useCurrentUser } from "../../../context/context";
import MongoDB from "../../../sql-nodejs/cosmosdb/app";
import { NextApiClient } from "../../api/next-api.client";

import { ModalWrapper } from "./modal.styles";
import ImageHandling from "./image-handling";

function AddItemModal({
  addModalIsOpen,
  setAddModalIsOpen,
  userIndex,
  setUsers,
  editItemIndex,
  currentUsersList,
  currentUserData,
}) {
  const [titleText, setTitleText] = useState("");
  const [quantityItem, setQuantityItem] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [linkItem, setLinkItem] = useState("");
  const [imgName, setImgName] = useState("");
  const [itemAlreadyExists, setItemAlreadyExists] = useState(false);
  const [emptyTitleField, setEmptyTitleField] = useState(false);

  const db = new MongoDB();
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const lobbyId = router.asPath.split("/").pop().replace("?", "");

  const apiClient = new NextApiClient();

  useEffect(() => {
    if (editItemIndex.description) {
      setTitleText(editItemIndex.description);
      setQuantityItem(editItemIndex.quantity);
      setItemPrice(editItemIndex.price);
      setLinkItem(editItemIndex.link);
      setImgName(editItemIndex.img);
    } else {
      setTitleText("");
      setQuantityItem("");
      setItemPrice("");
      setLinkItem("");
      setImgName("");
    }
  }, [editItemIndex]);

  const modalStyles = {
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      width: 350,
      overflow: "",
    },
    overlay: {
      background: "#091738b3",
    },
  };

  function closeModal() {
    setAddModalIsOpen(false);
    setEmptyTitleField(false);
    setItemAlreadyExists(false);
  }

  const checkifItemAlreadyExists = (input) => {
    const item = document.getElementById(`list-${userIndex}`);
    const li = Array.from(item.getElementsByTagName("h5"));
    const liValues = li.map((item) => {
      return item.innerText;
    });
    const response = toFindDuplicates(liValues, input);
    if (editItemIndex.description === input) return;
    return response.length > 0;
  };

  const updateUsersFrontEnd = (edit) => {
    setUsers((prev) => {
      let users = [...prev];

      let info = {};

      if (edit) {
        let currentItemInfo = users[userIndex].items[editItemIndex.idx];
        info = {
          ...currentItemInfo,
          description: titleText,
          price: itemPrice,
          quantity: quantityItem,
          link: linkItem,
          img: imgName,
          id: editItemIndex,
        };
        users[userIndex].items[editItemIndex.idx] = info;
      } else {
        info = {
          description: titleText,
          price: itemPrice,
          quantity: quantityItem,
          link: linkItem,
          img: imgName,
          id: currentUserData.items.length,
        };
        users[userIndex].items.push(info);
      }

      return users;
    });
  };

  const editItem = async (imageUpdate: boolean = false) => {
    const info = {
      lobbyId: lobbyId,
      userIndex: userIndex,
      itemIndex: editItemIndex.idx,
      description: titleText,
      link: linkItem,
      quantity: quantityItem,
      price: itemPrice,
      img: imageUpdate ? "" : imgName,
    };

    updateUsersFrontEnd(true);
    const updateCosmo = await db.updateItem(info);
    const reval = await apiClient.axiosInstance.get(
      `/api/revalidate?path=${lobbyId}`
    );
    return updateCosmo;
  };

  const addItem = async () => {
    const info = {
      lobbyId: lobbyId,
      userIndex: userIndex,
      itemIndex: currentUserData.items.length,
      description: titleText,
      link: linkItem,
      quantity: quantityItem,
      price: itemPrice,
      img: imgName,
      reserved: false,
      reservedBy: "",
    };

    updateUsersFrontEnd(false);
    const updateCosmo = await db.addNewItem(info);
    const reval = await apiClient.axiosInstance.get(
      `/api/revalidate?path=${lobbyId}`
    );
    return updateCosmo;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!titleText) {
      setEmptyTitleField(true);
      return;
    }

    if (checkifItemAlreadyExists(titleText)) {
      setItemAlreadyExists(true);
      return;
    }

    let itemUpdate;
    if (editItemIndex.description) {
      itemUpdate = editItem();
    } else {
      itemUpdate = addItem();
    }
    closeModal();
    return itemUpdate;
  };

  const isOwner = currentUser.email === currentUsersList?.email;

  return (
    <>
      <Modal
        isOpen={addModalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <form>
          <div
            onClick={closeModal}
            className="cursor-pointer absolute top-0 right-2"
          >
            X
          </div>
          <ModalWrapper>
            <div className="flex flex-col gap-2">
              <label htmlFor="title">
                <p>Tittel</p>
              </label>
              <input
                onChange={(e) => setTitleText(e.target.value)}
                required
                className="p-1 border-2 w-full"
                type="text"
                name="title"
                id=""
                value={titleText}
                disabled={!isOwner}
              />
              {itemAlreadyExists && (
                <p className="text-sm flex text-red-500">
                  You already have that item on your list!
                </p>
              )}
              {emptyTitleField && (
                <p className="text-sm flex text-red-500">
                  You have to put in a description!
                </p>
              )}
              <div className="grid grid-cols-2 gap-2">
                <div
                  className={`border-2 flex flex-col justify-center text-center relative`}
                >
                  <ImageHandling
                    isOwner={isOwner}
                    imgName={imgName}
                    setImgName={setImgName}
                    lobbyId={lobbyId}
                    editItem={editItem}
                  />
                </div>
                <div>
                  <label htmlFor="quantity">
                    <p>Antall</p>
                  </label>
                  <input
                    onChange={(e) => setQuantityItem(e.target.value)}
                    className="p-1 border-2 w-full"
                    pattern="[0-9]+"
                    type="number"
                    name="quantity"
                    id=""
                    value={quantityItem}
                    disabled={!isOwner}
                    placeholder="Valgfritt"
                  />
                  <label htmlFor="price">
                    <p>Pris</p>
                  </label>
                  <input
                    onChange={(e) => setItemPrice(e.target.value)}
                    className="p-1 border-2 w-full"
                    pattern="\d*"
                    type="number"
                    name="quantity"
                    id=""
                    value={itemPrice}
                    disabled={!isOwner}
                    placeholder="Valgfritt"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="link">
                  <div className="flex justify-between">
                    <p>Link</p>
                    <a  href={linkItem} target="_blank" rel="noopener noreferrer">
                    <Image src="/svg/hyperlink.svg" alt="link" width={32} height={32} />
                    </a>
                  </div>
                </label>
                <input
                  onChange={(e) => setLinkItem(e.target.value)}
                  className={`p-1 border-2 w-full ${!isOwner && 'bg-gray-500'}`}
                  type="text"
                  name="link"
                  id=""
                  value={linkItem}
                  disabled={!isOwner}
                />
              </div>
            </div>
            {isOwner && (
              <button
                onClick={onSubmit}
                className="mt-2 cursor-pointer rounded-md shadow-md bg-pink-700 hover:bg-pink-800 text-slate-200 p-2"
                type="submit"
                value="Submit"
              >
                Legg til
              </button>
            )}
          </ModalWrapper>
        </form>
      </Modal>
    </>
  );
}

export default AddItemModal;
