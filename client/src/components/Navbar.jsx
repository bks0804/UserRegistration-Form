import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <NavLink
            to="/home"
            className="rounded-md cursor-pointer hover:bg-gray-700 px-3 py-2 text-sm font-medium text-white"
            aria-current="page"
          >
            Home
          </NavLink>

          <button
            to="/logout"
            className="rounded-md cursor-pointer px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            onClick={() => {
              localStorage.removeItem("token");
              dispatch({ type: "USER", payload: false });
              navigate("/signin");
            }}
          >
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          <NavLink
            to="/register"
            className="rounded-md cursor-pointer px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Register
          </NavLink>

          <NavLink
            to="/signin"
            className="rounded-md cursor-pointer px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Login
          </NavLink>
        </>
      );
    }
  };

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-start">
              <div className="">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className=" ml-6 sm:block">
                <div className="flex space-x-4">
                  <RenderMenu />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

{
  /* <NavLink
                    to="/home"
                    className="rounded-md cursor-pointer hover:bg-gray-700 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="rounded-md cursor-pointer px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Register
                  </NavLink>

                  <NavLink
                    to="/signin"
                    className="rounded-md cursor-pointer px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Login
                  </NavLink>

                  <button
                    className="rounded-md cursor-pointer px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => {
                      localStorage.removeItem("token");
                      dispatch({ type: "USER", payload: false });
                      navigate("/signin");
                    }}
                  >
                    Logout
                  </button> */
}
