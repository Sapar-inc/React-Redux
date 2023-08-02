import { useState } from "react";
import s from "./Login.module.less";
import classNames from "classnames";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { v4: uuidv4 } = require("uuid");

function Login() {
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setavatar] = useState("");
  const navigate = useNavigate();

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRegistredLogin = (event) => {
    setLogin(event.target.value);
  };
  const handleRegistredName = (event) => {
    setName(event.target.value);
  };
  const handleRegistredPassword = (event) => {
    setPassword(event.target.value);
  };
  const handleRegistredAvatar = (event) => {
    setavatar(event.target.value);
  };

  const handleSingUp = async () => {
    const response = await axios.get("http://localhost:3001/items");
    const loginExists = response.data.find((item) => item.login === login);
    const passwordExists = response.data.find(
      (item) => item.password === password
    );

    if (loginExists && passwordExists) {
      const index = response.data.findIndex((item) => item.login === login);

      alert("Вы успешно вошли");

      navigate(`/${response.data[index].id}`);
    }
    if (!passwordExists) {
      alert("Пароль не правельный");
    }
    if (!loginExists) {
      alert("Логин не правельный ");
    }
    if (login === "" && password === "") {
      alert("Поля пустые, введите данные");
    }
  };
  const handleRegister = async () => {
    // Проверяем, что все поля заполнены
    if (!login || !name || !password || !avatar) {
      alert("Все поля должны быть заполнены");
      return;
    }

    if (login.length < 5 || password.length < 6) {
      alert("Логин заполнен меньше 5 символов, лиюо пароль меньше 6");
      return;
    }

    // Проверяем, что логин и пароль содержат только латинские символы и не содержат пробелов
    const latinCharsRegex = /^[a-zA-Z0-9]+$/;
    if (!latinCharsRegex.test(login) || !latinCharsRegex.test(password)) {
      alert("Вы ввели не латинские символы");
      return;
    }

    const response = await axios.get("http://localhost:3001/items");
    const data = response.data;

    const loginExists = data.some((item) => item.login === login);
    if (loginExists) {
      alert("Такой логин уже существует");
      return;
    }

    try {
      const data = {
        id: uuidv4(),
        avatar,
        login,
        name,
        password,
      };
      const response = await axios.post("http://localhost:3001/items", data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckbox1Change = (event) => {
    setIsChecked1(event.target.checked);
    setIsChecked2(!event.target.checked);
  };

  const handleCheckbox2Change = (event) => {
    setIsChecked2(event.target.checked);
    setIsChecked1(!event.target.checked);
  };

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.btnAuth}>
          <label>
            <input
              type="checkbox"
              className={s.checkbox}
              checked={isChecked1}
              onChange={handleCheckbox1Change}
            />
            <span
              className={classNames(s.btnChoice, { [s.isChecked]: isChecked1 })}
            >
              Sing Up
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              className={s.checkbox}
              checked={isChecked2}
              onChange={handleCheckbox2Change}
            />
            <span
              className={classNames(s.btnChoice, { [s.isChecked]: isChecked2 })}
            >
              Registration
            </span>
          </label>
        </div>
        {isChecked1 && (
          <div className={s.singUp}>
            <p>Login</p>
            <input
              type="text"
              placeholder="Login"
              onChange={handleLoginChange}
            />
            <p>Password</p>
            <input
              type="text"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            <br />
            <button onClick={handleSingUp}>Sing in</button>
          </div>
        )}
        {isChecked2 && (
          <div className={s.Register}>
            <p>Login</p>
            <input
              type="text"
              placeholder="Login"
              onChange={handleRegistredLogin}
            />
            <p>Name</p>
            <input
              type="text"
              placeholder="Name"
              onChange={handleRegistredName}
            />
            <p>Password</p>
            <input
              type="text"
              placeholder="Password"
              onChange={handleRegistredPassword}
            />
            <p>Avatar Url</p>
            <input
              type="text"
              placeholder="Avatar Url"
              onChange={handleRegistredAvatar}
            />
            <br />
            <button onClick={handleRegister}>Register</button>
          </div>
        )}
      </div>
    </>
  );
}
export default Login;
