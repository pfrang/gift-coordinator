import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import mongoDB from '../../../sql-nodejs/cosmosdb/app';

function MyModal({ modalIsOpen, setIsOpen }) {

  const [email, setEmail] = useState('');
  const [invitationLinkSent, setInvitationLinkSent] = useState(false)
  const router = useRouter();
  let subtitle;
  const db = new mongoDB

  useEffect(() => {
    if(invitationLinkSent) {
      setTimeout(() => {
        setIsOpen(false)
      }, 2000);
    }
  }, [invitationLinkSent])

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
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Example Modal"
      >

        <div id='grid2RowWrapper' className='bg-slate-100 h-full overflow-hidden'>
          <div>
            <button className='absolute right-0 border-2 p-1 border-green-400 bg-green-400 text-white' onClick={closeModal}>X</button>
          </div>
          {!invitationLinkSent ?
            <form id='grid2RowWrapper' className='h-full' onSubmit={onSubmit}>
              <input onChange={(e) => setEmail(e.target.value)} className='border-t-2 border-b-2 bg-slate-100 w-full text-center' placeholder='Enter e-mail address' name="" id="emailInput" required />
              <input className='w-full bg-slate-200 hover:bg-slate-400 cursor-pointer' type="submit" value="Send invitation link" />
            </form>
            :
            <div id='grid2RowWrapper'>
              <div className='success-checkmark'>
                <div className="check-icon">
                  <span className="icon-line line-tip"></span>
                  <span className="icon-line line-long"></span>
                  <div className="icon-circle"></div>
                  <div className="icon-fix"></div>
                </div>
              </div>
              <div className='flex justify-center text-center'>
                <p>{`An email has beent sent to ${email}`}</p>
              </div>
            </div>
          }
        </div>
      </Modal>
    </>
  );
}

export default MyModal;
