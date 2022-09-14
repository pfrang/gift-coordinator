import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

import BlobStorage from "../../../sql-nodejs/blob-storage/app";
import { toFindDuplicates } from "../../../utils/find-duplicates";
import { useCurrentUser } from "../../../context/context";
import MongoDB from "../../../sql-nodejs/cosmosdb/app";

import { ModalWrapper } from "./modal.styles";
import ImageHandling from "./image-handling";

function AddItemOfflineModal({ addModalIsOpen, setAddModalIsOpen }) {
  const [titleText, setTitleText] = useState("");
  const [quantityItem, setQuantityItem] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [linkItem, setLinkItem] = useState("");
  const [itemAlreadyExists, setItemAlreadyExists] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);

  const [imageInMemory, setImageInMemory] = useState({
    src: "",
    width: 0,
    height: 0,
  });
  const [enlarginPicture, setEnlargingPicture] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);

  const router = useRouter();
  const lobbyId = router.asPath.split("/").pop().replace("?", "");

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
    setImageInMemory({
      src: "",
      width: 0,
      height: 0,
    });
    setAddModalIsOpen(false);
    setItemAlreadyExists(false);
    setEnlargingPicture(false);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!titleText) {
      return;
    }

    setImageInMemory(undefined);
    closeModal();
  };

  return (
    <>
      <Modal
        isOpen={addModalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <form className="">
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
              />
              {itemAlreadyExists && (
                <p className="text-sm flex text-red-500">
                  You already have that item on your list!
                </p>
              )}
              <div className="grid grid-cols-2 gap-2">
                <div
                  className={`border-2 flex flex-col justify-center text-center ${
                    !enlarginPicture && "relative"
                  }`}
                >
                  <ImageHandling
                    setEnlargingPicture={setEnlargingPicture}
                    enlarginPicture={enlarginPicture}
                    imageInMemory={imageInMemory}
                    setImageInMemory={setImageInMemory}
                    imgUploading={imgUploading}
                    setImgUploading={setImgUploading}
                    fileSelected={fileSelected}
                    setFileSelected={setFileSelected}
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
                  />
                </div>
              </div>
              <div>
                <label htmlFor="link">
                  <p>Link</p>
                </label>
                <input
                  onChange={(e) => setLinkItem(e.target.value)}
                  className="p-1 border-2 w-full"
                  type="text"
                  name="link"
                  id=""
                  value={linkItem}
                />
              </div>
            </div>
            <button
              onClick={onSubmit}
              className="mt-2 cursor-pointer rounded-md shadow-md bg-pink-700 hover:bg-pink-800 text-slate-200 p-2"
              type="submit"
              value="Submit"
            >
              Legg til
            </button>
          </ModalWrapper>
        </form>
      </Modal>
    </>
  );
}

export default AddItemOfflineModal;