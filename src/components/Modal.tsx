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
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        onClick={() => handleShowModal(false)}
      >
        <div className="fixed inset-0 bg-base-200 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-base-300 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-base-300 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-xl font-medium leading-6 text-white"
                      id="modal-title"
                    >
                      {title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-white">{description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-base-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={() => handleShowModal(false)}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-base-200 bg-primary px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-primary-focus focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
