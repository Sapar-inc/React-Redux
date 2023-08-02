import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import Input from "../Input";
import Button from "../Button/Button";
import { authUser, dismissError } from "../../store/userSlice";

import s from "./Authorization.module.scss";

function Authorization() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, isLoading } = useSelector((store) => store.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState({});

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar({ message: error, variant: "error" });
      dispatch(dismissError());
    }
  }, [error]);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      enqueueSnackbar({ message: "There is no E-mail", variant: "error" });
      return;
    }
    if (!password) {
      enqueueSnackbar({ message: "There is no Password", variant: "error" });
      return;
    }

    dispatch(authUser({ login: email, password })).then(() => {
      enqueueSnackbar({ message: "Great job, You've authorized", variant: "success" });
    });
  };

  return (
    <form className={s.email_address} onSubmit={onSubmit}>
      <div className={s.inputs}>
        <Input
          value={email}
          onChange={onEmailChange}
          placeholder="Your E-mail"
          label="Email address"
        />
        <Input
          value={password}
          onChange={onPasswordChange}
          placeholder="Your Password"
          label="Password"
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Loading" : "Sign in"}
      </Button>
    </form>
  );
}

export default Authorization;
