import "./App.css";
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);

    console.log(count);
  };

  const setToLars = () => {
    setCount("Lars");
  };
  //--------------------------
  let tradCount = 0;

  const increaseTradCount = () => {
    tradCount = tradCount + 1;
    tradCount = tradCount + 1;
    console.log(tradCount);
  };

  return (
    <>
      <h1 onClick={setToLars}>{count}</h1>
      <button onClick={increaseCount}>increase</button>
      <button>decrease</button>
    </>
  );
}
