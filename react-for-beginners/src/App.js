import { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const onClick = () => setCounter((prev) => prev + 1);

  // component state가 변경될 때마다 매번 실행되는 코드
  console.log("I run all the time.");

  // useEffect()를 사용, 맨 처음 render될 때만 실행되는 코드
  const iRunOnlyOnce = () => {
    console.log("I run only once.");
  };
  useEffect(iRunOnlyOnce, []);

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me!</button>
    </div>
  );
}

export default App;
