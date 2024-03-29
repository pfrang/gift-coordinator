import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import validator from "validator";

import MongoDB from "../../../sql-nodejs/cosmosdb/app";
import { NextApiClient } from "../../api/next-api.client";
import { useCurrentUser } from "../../../context/context";

import { ModalWrapper } from "./modal.styles";

const FormLayOut = styled.form`
  position: relative;
  height: 200px;
`;

function InviteModal({ modalIsOpen, setIsOpen }) {
  const [email, setEmail] = useState("");
  const [invitationLinkSent, setInvitationLinkSent] = useState(false);
  const [badEmail, setBadEmail] = useState(false);
  const router = useRouter();

  const db = new MongoDB();
  const lobbyId = router.asPath.split("/").pop().replace("?", "");
  const apiClient = new NextApiClient();
  const { currentUser } = useCurrentUser();

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      width: 350,
    },
    overlay: {
      background: "#091738b3",
    },
  };

  useEffect(() => {
    if (invitationLinkSent) {
      setTimeout(() => {
        closeModal();
      }, 2000);
    }
  }, [invitationLinkSent]);

  function closeModal() {
    setInvitationLinkSent(false);
    setBadEmail(false);
    setIsOpen(false);
  }

  const onSendInvite = async (e) => {
    e.preventDefault();
    let res = validator.isEmail(email);
    if (!res) {
      setBadEmail(true);
      return;
    }

    signIn("email", {
      email: email,
      callbackUrl: router.asPath,
      redirect: false,
    });
    const info = {
      lobbyId: lobbyId,
      user: currentUser.email,
      userInvited: email,
    };
    setInvitationLinkSent(true);
    setBadEmail(false);
    const updateCosmo = await db.inviteUser(info);
    const reval = await apiClient.axiosInstance.get(
      `/api/revalidate?path=${lobbyId}`
    );
    return updateCosmo;
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <FormLayOut>
          <div
            onClick={closeModal}
            className="cursor-pointer absolute top-0 right-2"
          >
            X
          </div>
          <ModalWrapper>
            {!invitationLinkSent ? (
              <div className="pt-4 flex flex-col">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-t-2 p-2 border-b-2 bg-slate-100 w-full text-center"
                  placeholder="Enter e-mail address"
                  name=""
                  id="emailInput"
                  required
                />
                {badEmail && (
                  <p className="text-sm text-red-500 text-center">
                    That is not a valid email adress
                  </p>
                )}
                <button
                  onClick={onSendInvite}
                  className="mt-auto w-full rounded-md p-2 text-grey bg-pink-700 hover:bg-pink-800 text-slate-200"
                >
                  Send invitation link
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="success-checkmark">
                  <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                  </div>
                </div>
                <div className="flex justify-center text-center">
                  <p>{`An email has beent sent to ${email}`}</p>
                </div>
              </div>
            )}
          </ModalWrapper>
        </FormLayOut>
      </Modal>
    </>
  );
}

export default InviteModal;
