import React, { useState } from "react";
import { Link } from "react-router-dom";

import Authorization from "../../components/Authorization";

import s from "./AuthorizationPage.module.scss";

function AuthorizationPage({ variant = "authorization" }) {
  return (
    <div className={s.wrapper}>
      <div className={s.auth_block}>
        <div className={s.auth_register}>
          <Link to="/" className={`${s.tab} ${variant === "authorization" ? s.active : ""}`}>
            Sign up
          </Link>
          <Link to="/registration" className={`${s.tab} ${variant === "registration" ? s.active : ""}`}>
            Register
          </Link>
        </div>
        {variant === "authorization" && <Authorization />}
      </div>
    </div>
  );
}

export default AuthorizationPage;
