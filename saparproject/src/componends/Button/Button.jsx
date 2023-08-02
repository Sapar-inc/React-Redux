import React from "react";

import s from "./Button.module.css"

function Button (props) {
    return (
        <button
        className={s.button}
        style={{color: props.color}}
        >
            {props.children}
        </button>
    )
}

export default Button;