import React, { useState } from "react";

import s from "./Counter.module.css";

function Counter() {
  const [count, setCount] = useState(0);

  const onIncriment = () => {
    setCount(count + 1);
  };
  const onDecremnt = () => {
    setCount(count - 1);
  };
  const onPlusTen = () => {
    setCount(count + 10);
  };
  const onMinusTen = () => {
    setCount(count * count);
  };
  const onZero = () => {
    setCount(count * 0);
  };
  return (
    <div className={s.counter}>
      <div className={s.title}>Counter</div>
      <div className={s.value}>{count}</div>
      <div className={s.buttons}>
        <button className={s.button} onClick={onDecremnt}>
          - 1
        </button>
        <button className={s.button} onClick={onIncriment}>
          + 1
        </button>
      </div>
      <div className={s.buttons}>
        <button className={s.button} onClick={onPlusTen}>
          +10
        </button>
        <button className={s.button} onClick={onMinusTen}>
          sqrt
        </button>
        <button className={s.button} onClick={onZero}>
          clear
        </button>
      </div>
    </div>
  );
}

export default Counter;
