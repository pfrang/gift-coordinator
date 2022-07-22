import React from 'react';
import Modal from 'react-modal'
import mongoDB from '../../../sql-nodejs/cosmosdb/app';

function MyModal({ modalIsOpen, setIsOpen }) {
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
    setIsOpen(false);
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
          <div>
              <input className='border-t-2 p-3 w-full text-center' placeholder='Enter e-mail address' type="email" name="" id="emailInput" required />
          </div>
          <div className='w-full h-full flex justify-center content-center align-center bg-slate-100'>
            <button className='w-full'>Send invitation link</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default MyModal;
