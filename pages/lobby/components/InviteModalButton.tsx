import React from 'react';

function InviteModalButton({setShowModal, children}) {

  const handleClick = () => {
    setShowModal(true)
  }
  return (
    <button onClick={handleClick} className="h-12 p-2 mt-2 w-[100px] border-2 rounded-lg bg-green-500 hover:bg-green-700 text-white text-xs">
      {children}
    </button>
  );
}

export default InviteModalButton;
