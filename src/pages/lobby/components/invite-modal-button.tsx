import React from "react";

function InviteModalButton({ setShowModal, children }) {
  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <button
      onClick={handleClick}
      className="h-12 p-3 hover:bg-blue-800 bg-pink-700 hover:bg-pink-800 rounded-md text-xs"
    >
      <h5>{children}</h5>
    </button>
  );
}

export default InviteModalButton;
