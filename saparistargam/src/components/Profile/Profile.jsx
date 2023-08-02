import React, { useState, useEffect } from "react";
import axios from "axios";
import s from "./Profile.module.less";
import { useNavigate } from "react-router-dom";

function Profile() {
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
  const [urlName, setUrlName] = useState("");

  const findNameUsers = async () => {
    const response = await axios.get("http://localhost:3001/posts");
    const currentPath = window.location.pathname.split("/");

    const firstMatch = response.data.find((obj) => obj.name === currentPath[3]);
    return firstMatch;
  };
  useEffect(() => {
    findNameUsers().then((result) => setUrlName(result));
  }, []);
  /* ------------------------------------------------------------------------------------------------------------ */

  const [profObj, setprofObj] = useState("");

  const profileObj = async () => {
    const response = await axios.get("http://localhost:3001/posts");
    const currentPath = window.location.pathname.split("/");

    const result = response.data
      .filter(
        (item) =>
          item.name === currentPath[3] &&
          response.data.some((other) => other.name === currentPath[3])
      )
      .map((item) => (
        <div key={item.id} onClick={() => toggleModal(item)}>
          <div className={s.podPosts}>
            <img src={item.img} alt="" />
            <p>{item.title}</p>
          </div>
        </div>
      ));
    return result;
  };
  useEffect(() => {
    profileObj().then((result) => setprofObj(result));
  }, []);
  /* ------------------------------------------------------------------------------------------------------------ */

  const navigate = useNavigate();
  const LogOut = () => {
    navigate(`/Login`);
  };
  const Back = () => {
    navigate(`/${userObject.id}`);
  };
  const goToUsers = () => {
    navigate(`/${userObject.id}/Users`);
  };

  /* ------------------------------------------------------------------------------------------------------------ */

  /* Модальное окно для создании поста*/
  const [showModal, setShowModal] = useState(false);
  const [divModal, setdivModal] = useState("");
  const toggleModal = (item) => {
    setdivModal(item);
    setShowModal(!showModal);
  };
  /* ----------------------------------------------------------------------------------------------------------------  */

  return (
    <>
      <div className={s.wrapper}>
        {userObject.name ? (
          <div className={s.userBlock}>
            <img src={userObject.avatar} alt="..."></img>
            <h1>{userObject.name}</h1>
            <div className={s.btnUser} onClick={goToUsers}>
              Users
            </div>
            <div onClick={LogOut} className={s.btnUser}>
              Log Out
            </div>
            <div onClick={Back} className={s.btnUser}>
              Back
            </div>
          </div>
        ) : null}
        {urlName ? (
          <div className={s.Profile}>
            <div className={s.profileUser}>
              <img src={urlName.avatar} alt="" />
              <h1>{urlName.name}</h1>
            </div>
            <h1 className={s.shitPost}>SHIT POSTS</h1>
            <div className={s.ShitPostsBlock}>{profObj}</div>
          </div>
        ) : null}

        {showModal ? (
          <div className={s.modal}>
            <div className={s.modal__content}>
              <img src={divModal.img} alt="" />
              <h1>{divModal.title}</h1>
              <p>{divModal.text}</p>
              <button className={s.close} onClick={toggleModal}>
                Закрыть
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Profile;
