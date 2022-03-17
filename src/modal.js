import React, { useEffect } from "react";

export default function Modal({ modalContent, closeModal }) {
  useEffect(() => setTimeout(() => closeModal(), 3000));
  return (
    <div>
      <p>{modalContent}</p>
    </div>
  );
}
