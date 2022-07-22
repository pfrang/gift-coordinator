import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Modal from 'react-modal'
import mongoDB from '../../../sql-nodejs/cosmosdb/app';

function MyModal({ modalIsOpen, setIsOpen }) {

  const [email, setEmail] = useState('');
  const [invitationLinkSent, setInvitationLinkSent] = useState(false)
  const router = useRouter();
  let subtitle;
  const db = new mongoDB

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

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setInvitationLinkSent(false)
    setIsOpen(false);
  }

  const onSubmit = (e) => {
    e.preventDefault()
    signIn(
      "email",
      {
        email: email,
        callbackUrl: router.asPath,
        redirect: false
      }
    )
    setInvitationLinkSent(true)
  }


  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Example Modal"
      >

        <div id='grid3RowWrapper' className='h-full'>
          <div className='flex'>
            <div className='flex justify-between w-full mb-5'>
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hi</h2>
              <button onClick={closeModal}>X</button>
            </div>
          </div>
          {!invitationLinkSent ?
            <>
              <div>
              </div>
              <form onSubmit={onSubmit}>
                <input onChange={(e) => setEmail(e.target.value)} className='border-t-2 p-3 w-full text-center' placeholder='Enter e-mail address' name="" id="emailInput" required />
                <input className='w-full bg-slate-100 hover:bg-slate-200' type="submit" value="Send invitation link" />
              </form>
            </>
            :
            <>
              <div className='flex justify-center text-center border-t-2'>
                <p>{`An email has beent snet to ${email}`}</p>
              </div>
              <div className='bg-slate-100 flex justify-center hover:bg-slate-200'>
                <button className='w-full ' onClick={closeModal}>Close</button>
              </div>
            </>
          }
        </div>
      </Modal>
    </>
  );
}

export default MyModal;
