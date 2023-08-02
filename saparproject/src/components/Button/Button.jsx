import React from "react";

import s from "./Button.module.scss";

function Button({
  className,
  children,
  type = "button",
  variant = "default",
  onClick = () => {},
  ...props
}) {
  return (
    <button
      className={`${s.btn} ${className} ${s[variant]}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
