import axios from "axios";
import React, { useEffect } from "react";

const DeleteProfileModal = ({ closeModal }) => {
  const deleteSubmitData = (e, userId) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios.delete(`http://localhost:8000/api/admin/users/?key=${userId}`, {
      headers: {
        Authorization: token,
      },
    });
  };

  useEffect(() => {
    // Hide scrollbar when modal is open
    document.body.style.overflow = "hidden";

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3
                  className="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  Delete Member Details
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                  className="cursor-pointer"
                  onClick={closeModal}
                >
                  <path
                    fill="#251f1f"
                    d="M20 6.91 17.09 4 12 9.09 6.91 4 4 6.91 9.09 12 4 17.09 6.91 20 12 14.91 17.09 20 20 17.09 14.91 12z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this Member details? This action
                cannot be undone.
              </p>
              <div className="py-3 sm:flex sm:flex-row-reverse">
                <button
                  type="reset"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-[#6941C6] px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                  onClick={deleteSubmitData}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfileModal;
