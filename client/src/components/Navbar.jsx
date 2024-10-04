import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center  sm:items-stretch justify-start">
              <div className="">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className=" ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavLink
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
