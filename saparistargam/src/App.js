import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import './App.less'

import Login from "./components/Login";
import HomeDOM from "./components/HomeDOM";
import Profile from "./components/Profile";
import Users from "./components/Users";

function App() {
  /* ------------------------------------------------------------------------------------------------------------ */
  const [userObject, setuserObject] = useState("");
  const getIndex = async () => {
    const currentPath = window.location.pathname.split("/");
    return currentPath[1];
  };
  useEffect(() => {
    getIndex().then((result) => setuserObject(result));
  }, []);
  /* ------------------------------------------------------------------------------------------------------------ */
  const [userName, setUserName] = useState("");
  const findNameUsers = async () => {
    const currentPath = window.location.pathname.split("/");
    return currentPath[3];
  };
  useEffect(() => {
    findNameUsers().then((result) => setUserName(result));
  }, []);
  /* ------------------------------------------------------------------------------------------------------------ */

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeDOM />} />
          <Route path="/Login" element={<Login />} />
          <Route path={`${userObject}/Users`} element={<Users />} />
          <Route
            path={`${userObject}/Profile/${userName}`}
            element={<Profile />}
          />
          <Route path={userObject} element={<HomeDOM />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
