import React, { createContext, useReducer } from "react";
import "./App.css";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AdminSection from "./components/AdminSection";
import DeleteProfileModal from "./components/DeleteProfileModal";
import UpadteProfileModal from "./components/UpdateProfileModal";
import { reducer, initialState } from "./Reducer/UseReducer";
export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/adminsection" element={<AdminSection />} />
      <Route path="/deleteprofile" element={<DeleteProfileModal />} />
      <Route path="/update/:id" element={<UpadteProfileModal />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
