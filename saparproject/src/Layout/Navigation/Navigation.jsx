import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../store/userSlice";

import s from "./Navigation.module.scss";

function Navigation() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className={s.navigation}>
      <div>{user.login}</div>
      <button onClick={onLogOut}>LogOut</button>
    </div>
  );
}

export default Navigation;
