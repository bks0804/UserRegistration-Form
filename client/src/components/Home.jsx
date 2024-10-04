import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="text-center text-3xl ">Welcome to Home</div>;
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        <a href="/adminsection">AdminSection</a>
      </button>
    </>
  );
};

export default Home;
