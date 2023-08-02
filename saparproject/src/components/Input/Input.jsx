import React from "react";

import s from "./Input.module.scss";

function Input({ value, onChange, label = "", placeholder = "", ...props }) {
  return (
    <label className={s.label}>
      {label}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={s.input}
        {...props}
      />
    </label>
  );
}

export default Input;
