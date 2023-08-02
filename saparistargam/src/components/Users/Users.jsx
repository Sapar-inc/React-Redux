import React, { useState, useEffect } from "react";
import axios from "axios";
import s from "./Users.module.less";
import { useNavigate } from "react-router-dom";

function Users() {
  /* ------------------------------------------------------------------------------------------------------------ */
  const [userObject, setuserObject] = useState("");
  const getIndex = async () => {
    const response = await axios.get("http://localhost:3001/items");
    const currentPath = window.location.pathname.split("/");
    if (currentPath[1] !== "") {
      const index = response.data.findIndex(
        (item) => item.id === currentPath[1]
      );
      const user = response.data[index];
      // console.log(user);
      return user;
    }
  };
  useEffect(() => {
    getIndex().then((result) => setuserObject(result));
  }, []);

  /* ------------------------------------------------------------------------------------------------------------ */

  const [usersObject, setusersObject] = useState("");
  const getUsers = async () => {
    const response = await axios.get("http://localhost:3001/items");
    const currentPath = window.location.pathname.split("/");
    const filteredArr = response.data.filter(
      (item) => item.id !== currentPath[1]
    );

    const listItems = filteredArr.map((item) => (
      <div key={item.id} className={s.UserDiv}>
        <img src={item.avatar} alt="" />
        <h1>{item.name}</h1>
        <button onClick={() => Follow(item.name)}>Follow</button>
      </div>
    ));
    return listItems;
  };
  useEffect(() => {
    getUsers().then((result) => setusersObject(result));
  }, []);

  /* ------------------------------------------------------------------------------------------------------------ */

  const navigate = useNavigate();
  const LogOut = () => {
    navigate(`/Login`);
  };
  const Back = () => {
    // console.log(`/${userObject.id}`);
    navigate(-1);
  };

  const Follow = async (names) => {
    const currentPath = window.location.pathname.split("/");
    navigate(`/${currentPath[1]}/Profile/${names}`);
  };

  /* ------------------------------------------------------------------------------------------------------------ */

  return (
    <>
      <div className={s.wrapper}>
        {userObject.name ? (
          <div className={s.userBlock}>
            <img src={userObject.avatar} alt="..."></img>
            <h1>{userObject.name}</h1>
            <div onClick={LogOut} className={s.btnUser}>
              Log Out
            </div>
            <div onClick={Back} className={s.btnUser}>
              Back
            </div>
          </div>
        ) : null}
        <div className={s.UsersBlocks}>{usersObject}</div>
      </div>
    </>
  );
}

export default Users;
