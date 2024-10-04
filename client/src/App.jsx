import React from "react";
import "./App.css";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AdminSection from "./components/AdminSection";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navbar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/adminsection" element={<AdminSection />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
