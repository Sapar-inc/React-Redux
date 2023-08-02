import React from "react";

import Icon1 from "../../images/Icon1.png";
import Icon2 from "../../images/Icon2.png";
import Icon3 from "../../images/Icon3.png";
import Icon4 from "../../images/Icon4.png";

import s from "./CardName.module.css";

export default function CardName({avatar,name,speciality,linkwho,MailIcon,Ln,aboutText,interestText,}) 
{
  return (
    <>
      <div className={s.wrapper}>
        <img className={s.avatar} src={avatar}></img>
        <div className={s.aboutCard}>
          <p className={s.name}>{name}</p>
          <p className={s.speciality}>{speciality}</p>
          <p className={s.linkwho}>{linkwho}</p>
          <div className={s.buttons}>
            <button className={s.button}>
              <img src={MailIcon} className={s.MailIcon} />
              Email
            </button>
            <button className={s.button} style={{ backgroundColor: "#5093E2", border: "#5093E2" }}>
              <img src={Ln} className={s.MailIcon} />
              Linkedln
            </button>
          </div>
          <div className={s.contentText}>
            <h1>About</h1>
            <p className={s.aboutText}>{aboutText}</p>
            <h1>Interests</h1>
            <p className={s.aboutText}>{interestText}</p>
          </div>
          <div className={s.Links}>
            <img className={s.linkIcons} src={Icon1} />
            <img className={s.linkIcons} src={Icon2} />
            <img className={s.linkIcons} src={Icon3} />
            <img className={s.linkIcons} src={Icon4} />
          </div>
        </div>
      </div>
    </>

  );
}

