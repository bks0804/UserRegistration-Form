import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateProfileModal from "./UpdateProfileModal";
// import DeleteProfileModal from "../Modal/DeleteProfileModal";

const AdminSection = () => {
  // ** Data state
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // ** Edit and Delete state
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [itemId, setItemId] = useState();

  function handleViewModal(index) {
    setOpenViewModal(true);
    setItemId(index);
  }

  // Fetch data from the backend API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/admin/users")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="p-4 relative">
        <table className="border w-full">
          <thead>
            <tr className="text-[12px] font-medium border-t">
              <th className="px-4 py-2">
                <div className="text-[#475467] flex gap-2 items-center">
                  <span>Fullname</span>
                </div>
              </th>
              <th className="px-4 py-2">
                <div className="text-[#475467] flex gap-2 items-center">
                  <span>Email Address</span>
                </div>
              </th>
              <th className="px-4 py-2">
                <div className="text-[#475467] flex gap-2 items-center">
                  <span>Phone Number</span>
                </div>
              </th>
              <th className="px-4 py-2">
                <div className="text-[#475467] flex gap-2 items-center">
                  <span>Address</span>
                </div>
              </th>
              <th className="px-4 py-2">
                <div className="text-[#475467] flex gap-2 items-center">
                  <span>Status</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr
                key={index}
                className={`border-t ${index % 2 === 1 ? "" : "bg-[#E4E7EC]"}`}
              >
                <td className="px-4 py-2 cursor-pointer">
                  <div className="flex gap-2">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="text-sm text-[#101828] font-medium">
                        {user.fullName}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 cursor-pointer">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium border-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="0.65em"
                        height="0.65em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#17B26A"
                          d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                        />
                      </svg>
                      {user.isVerified}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 cursor-pointer">
                  <div>
                    <span className="text-[#475467] font-normal text-sm">
                      {user.email}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 cursor-pointer">
                  <div>
                    <span className="text-[#475467] font-normal text-sm">
                      {user.phoneNumber}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 cursor-pointer">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                      Design
                    </span>
                    {user.address}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                      cursor="pointer"
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setItemId(index);
                      }}
                    >
                      <path
                        fill="#475467"
                        d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zM7 6h10v13H7zm2 2v9h2V8zm4 0v9h2V8z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                      cursor="pointer"
                      onClick={() => {
                        setOpenEditModal(true);
                        setItemId(index);
                      }}
                    >
                      <path
                        fill="#475467"
                        d="m14.06 9 .94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
            {loading && (
              <tr className="border-t">
                <td className="px-4 py-2" colSpan={6}>
                  <div className="w-full flex items-center justify-center gap-2 py-24">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <circle cx={12} cy={2} r={0} fill="currentColor">
                        <animate
                          attributeName="r"
                          begin={0}
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                      <circle
                        cx={12}
                        cy={2}
                        r={0}
                        fill="currentColor"
                        transform="rotate(45 12 12)"
                      >
                        <animate
                          attributeName="r"
                          begin="0.125s"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                      <circle
                        cx={12}
                        cy={2}
                        r={0}
                        fill="currentColor"
                        transform="rotate(90 12 12)"
                      >
                        <animate
                          attributeName="r"
                          begin="0.25s"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                      <circle
                        cx={12}
                        cy={2}
                        r={0}
                        fill="currentColor"
                        transform="rotate(135 12 12)"
                      >
                        <animate
                          attributeName="r"
                          begin="0.375s"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                      <circle
                        cx={12}
                        cy={2}
                        r={0}
                        fill="currentColor"
                        transform="rotate(180 12 12)"
                      >
                        <animate
                          attributeName="r"
                          begin="0.5s"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                      <circle
                        cx={12}
                        cy={2}
                        r={0}
                        fill="currentColor"
                        transform="rotate(225 12 12)"
                      >
                        <animate
                          attributeName="r"
                          begin="0.625s"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                      <circle
                        cx={12}
                        cy={2}
                        r={0}
                        fill="currentColor"
                        transform="rotate(270 12 12)"
                      >
                        <animate
                          attributeName="r"
                          begin="0.75s"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                      <circle
                        cx={12}
                        cy={2}
                        r={0}
                        fill="currentColor"
                        transform="rotate(315 12 12)"
                      >
                        <animate
                          attributeName="r"
                          begin="0.875s"
                          calcMode="spline"
                          dur="1s"
                          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                          repeatCount="indefinite"
                          values="0;2;0;0"
                        />
                      </circle>
                    </svg>
                    <span>Loading..</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {openEditModal && (
        <UpdateProfileModal
          closeModal={() => {
            setOpenEditModal(false);
            setItemId();
          }}
        />
      )}
      {/* {openDeleteModal && (
        <DeleteProfileModal
          closeModal={() => {
            setOpenDeleteModal(false);
            setItemId();
          }}
        />
      )} */}
    </>
  );
};

export default AdminSection;
