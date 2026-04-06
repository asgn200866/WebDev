import { useState } from "react";

export function ConterButton() {
  const [countClick, setCountClick] = useState(0);
  const handlerClick = () => {
    setCountClick(countClick + 1);
  };
  return <button onClick={handlerClick}>Click so far: ${countClick}</button>;
}
