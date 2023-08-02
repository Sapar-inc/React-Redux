import React, { useState, useEffect } from "react";
import axios from "axios";
import s from "./HomeDOM.module.less";
import { useNavigate } from "react-router-dom";

function HomeDOM() {
  /* Здесь хранится информация о пользователя который зашел */
  const [userObject, setuserObject] = useState("");
  const getIndex = async () => {
    const response = await axios.get("http://localhost:3001/items");
    const currentPath = window.location.pathname.slice(1);
    if (currentPath !== "") {
      const index = response.data.findIndex((item) => item.id === currentPath);
      const user = response.data[index];
      // console.log(user);
      return user;
    } else {
      // console.log("Ничего нету");
      return "Ничего нету";
    }
  };
  useEffect(() => {
    getIndex().then((result) => setuserObject(result));
  }, []);
  /* ------------------------------------------------------------------------------------------------------------ */

  /* навигация по кнопкам  */
  const navigate = useNavigate();
  const LogOut = () => {
    navigate(`/Login`);
  };
  const goToUsers = () => {
    navigate(`/${userObject.id}/Users`);
  };
  const who = (names) => {
    navigate(`/${userObject.id}/Profile/${names}`);
  };
  /* ----------------------------------------------------------------------------------------------------------------  */

  /* Здесь хранится информация о постах */
  const [postsObject, setpostsObject] = useState([]);

  const getPosts = async () => {
    const response = await axios.get("http://localhost:3001/posts");
    // console.log(response.data)
    return response.data;
  };
  useEffect(() => {
    getPosts().then((result) => setpostsObject(result));
  }, []);
  getPosts();

  const divList = postsObject.map((item) => (
    <div key={item.id} className={s.list}>
      <div className={s.userPost} onClick={() => who(item.name)}>
        <img src={item.avatar} alt="" />
        <h3>{item.name}</h3>
      </div>
      <div className={s.postShit}>
        <img src={item.img} alt="" />
        <div className={s.postInfo}>
          <h1>{item.title}</h1>
          <p>{item.text}</p>
        </div>
      </div>
    </div>
  ));

  /* ----------------------------------------------------------------------------------------------------------------  */

  /* Модальное окно для создании поста*/
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const [showModal2, setShowModal2] = useState(false);
  const toggleModal2 = () => {
    setShowModal2(!showModal2);
  };

  /* ----------------------------------------------------------------------------------------------------------------  */

  /* Отправка поста*/
  const [modalImg, setModalImg] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModaltext] = useState("");

  const postUrl = (event) => {
    setModalImg(event.target.value);
  };
  const postTitle = (event) => {
    setModalTitle(event.target.value);
  };
  const postText = (event) => {
    setModaltext(event.target.value);
  };
  const { v4: uuidv4 } = require("uuid");
  const click = async () => {
    if (!modalTitle || !modalImg || !modalText) {
      alert("Поля пустые");
      return;
    }
    try {
      const data = {
        id: uuidv4().slice(6, 20),
        id_user: userObject.id,
        avatar: userObject.avatar,
        name: userObject.name,
        title: modalTitle,
        img: modalImg,
        text: modalText,
      };
      const response = await axios.post("http://localhost:3001/posts", data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  /* ----------------------------------------------------------------------------------------------------------------  */
  /* Отправка изменения в профиль*/
  const [modalLogin, setModalLogin] = useState("");
  const [modalName, setModalName] = useState("");
  const [modalPassword, setModalPassword] = useState("");
  const [modalUrlImg, setModalUrlImg] = useState("");

  const postLogin = (event) => {
    setModalLogin(event.target.value);
  };
  const postName = (event) => {
    setModalName(event.target.value);
  };
  const postPassword = (event) => {
    setModalPassword(event.target.value);
  };
  const postUrlImg = (event) => {
    setModalUrlImg(event.target.value);
  };
  const click2 = async () => {
    if (!modalLogin || !modalName || !modalPassword || !modalUrlImg) {
      alert("Поля пустые");
      return;
    }
    if (
      modalLogin.length < 5 ||
      modalName.length < 3 ||
      modalPassword.length < 6
    ) {
      alert("Логин меньше 5 либо имя меньше 3 либо пароль меньше 6");
      return;
    }
    const latinCharsRegex = /^[a-zA-Z0-9]+$/;
    if (
      !latinCharsRegex.test(modalLogin) ||
      !latinCharsRegex.test(modalName) ||
      !latinCharsRegex.test(modalPassword)
    ) {
      alert("Вы ввели не латинские символы");
      return;
    }

    try {
      const data = {
        id: userObject.id,
        avatar: modalUrlImg,
        login: modalLogin,
        name: modalName,
        password: modalPassword,
        
      };
      const data2 = {
        id_user: userObject.id,
        avatar: modalUrlImg,
        name: modalName,
        
      };
      const response = await axios.post("http://localhost:3001/items", data);
      const response2 = await axios.post("http://localhost:3001/edit", data2);
      console.log(response.data);
      console.log(response2.data);
    } catch (error) {
      console.error(error);
    }
  };

  /* ----------------------------------------------------------------------------------------------------------------  */
  return (
    <>
      <div className={s.wrapper}>
        {/* Окно с пользователем--------------------------------------------------------------------- */}
        {userObject.name ? (
          <div className={s.userBlock}>
            <img
              src={userObject.avatar}
              onClick={() => who(userObject.name)}
              alt="..."
            ></img>
            <h1>{userObject.name}</h1>
            <div className={s.btnUser} onClick={goToUsers}>
              Users
            </div>
            <div onClick={toggleModal} className={s.btnUser}>
              Create Post
            </div>
            <div className={s.btnUser} onClick={toggleModal2}>
              Edit Profile
            </div>
            <div onClick={LogOut} className={s.btnUser}>
              Log Out
            </div>
          </div>
        ) : (
          <div className={s.btnJoin}>
            <div onClick={LogOut} className={s.btnUser}>
              Join
            </div>
          </div>
        )}
        {/* -------------------------------------------------------------------------- */}

        {/* Посты--------------------------------------------------------------------- */}
        <div className={s.windowFeed}>{divList}</div>
        {/* -------------------------------------------------------------------------- */}

        {/* Модальное окно------------------------------------------------------------ */}
        {showModal ? (
          <div className={s.modal}>
            <div className={s.modal__content}>
              <button className={s.close} onClick={toggleModal}>
                Закрыть
              </button>
              <p>Картинка Url: </p>
              <input
                type="text"
                placeholder="отправить Url картинку"
                onChange={postUrl}
              />
              <p>Title: </p>
              <input
                type="text"
                placeholder="Введите название поста"
                onChange={postTitle}
              />
              <p>Text: </p>
              <textarea
                type="text"
                placeholder="Введите текст поста"
                onChange={postText}
              />
              <button onClick={click}>Отправить</button>
            </div>
          </div>
        ) : null}

        {showModal2 ? (
          <div className={s.modal}>
            <div className={s.modal__content}>
              <button className={s.close} onClick={toggleModal2}>
                Закрыть
              </button>
              <p>Login </p>
              <input
                type="text"
                placeholder="Введите новый логин"
                onChange={postLogin}
              />
              <p>Name </p>
              <input
                type="text"
                placeholder="Введите новое имя"
                onChange={postName}
              />
              <p>Password </p>
              <input
                type="text"
                placeholder="Введите новый пароль"
                onChange={postPassword}
              />
              <p>Смена аватарки url</p>
              <input
                type="text"
                placeholder="Введите url картинки"
                onChange={postUrlImg}
              />
              <button onClick={click2}>Отправить</button>
            </div>
          </div>
        ) : null}
        {/* --------------------------------------------------------------------------- */}
      </div>
    </>
  );
}

export default HomeDOM;
