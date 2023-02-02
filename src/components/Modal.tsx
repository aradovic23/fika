import React from "react";

type ModalCallback = (state: boolean) => void;

interface ModalProps {
  handleShowModal: ModalCallback;
  description: string;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({
  handleShowModal,
  description,
  title,
}) => {
  return (
    <div
      className="modal modal-open modal-bottom sm:modal-middle"
      onClick={() => handleShowModal(false)}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-4">{description}</p>
        <div className="modal-action">
          <label
            htmlFor="my-modal-6"
            className="btn"
            onClick={() => handleShowModal(false)}
          >
            Yay!
          </label>
        </div>
      </div>
    </div>
  );
};
