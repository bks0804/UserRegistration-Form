import axios from "axios";
import React, { useEffect, useState } from "react";

const UpadteProfileModal = ({ data, closeModal }) => {
  const [formData, setFormData] = useState({
    _id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    address: { street: "", city: "", state: "", country: "", postalCode: "" },
  });

  const token = localStorage.getItem("token");

  const updateSubmitData = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `http://localhost:8000/api/admin/users/${formData._id}`,
        { ...formData },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setFormData({
          fullName: res.data.fullName,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
          city: res.data.city,
          state: res.data.state,
          country: res.data.country,
          postalCode: res.data.postalCode,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setFormData(data);

    // Hide scrollbar when modal is open
    document.body.style.overflow = "hidden";

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [data]);

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
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 space-y-4">
              <form className="space-y-12" onSubmit={updateSubmitData}>
                <div>
                  <img
                    className="h-20 w-20 rounded-full mx-auto"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer inline-flex w-full items-center gap-1 justify-center rounded-md px-3 py-2 text-sm font-semibold text-[#000000] bg-gray-50 shadow-sm sm:ml-3 sm:w-auto ring-1 ring-inset ring-gray-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.5em"
                          height="1.5em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 0 0-8 8 8 8 0 0 0 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18a6 6 0 0 1-6-6 6 6 0 0 1 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z"
                          />
                        </svg>
                        <span>CHANGE PHOTO</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      fullName
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        id="name"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        autoComplete="email"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          })
                        }
                        type="text"
                        autoComplete="text"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street
                    </label>
                    <div className="mt-2">
                      <input
                        id="city"
                        name="city"
                        placeholder="Street"
                        type="text"
                        value={formData.address.street}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: {
                              ...formData.address,
                              street: e.target.value,
                            },
                          })
                        }
                        autoComplete="text"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        id="city"
                        name="city"
                        placeholder="City"
                        type="text"
                        value={formData.address.city}
                        onChange={(e) =>
                          setFormData({
                            // ...formData,
                            address: {
                              ...formData.address,
                              city: e.target.value,
                            },
                          })
                        }
                        autoComplete="text"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State
                    </label>
                    <div className="mt-2">
                      <input
                        id="state"
                        name="state"
                        type="text"
                        placeholder="State"
                        value={formData.address.state}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: {
                              ...formData.address,
                              state: e.target.value,
                            },
                          })
                        }
                        autoComplete="text"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Country"
                        value={formData.address.country}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: {
                              ...formData.address,
                              county: e.target.value,
                            },
                          })
                        }
                        autoComplete="text"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      PostalCode
                    </label>
                    <div className="mt-2">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="PostalCode"
                        value={formData.address.postalCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: {
                              ...formData.address,
                              postalCode: e.target.value,
                            },
                          })
                        }
                        autoComplete="text"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="py-3 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    onClick={updateSubmitData}
                    className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-[#06103C] bg-gray-50 shadow-sm sm:ml-3 sm:w-auto ring-1 ring-inset ring-gray-300"
                  >
                    Save
                  </button>
                  <button
                    type="reset"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#06103C] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpadteProfileModal;
