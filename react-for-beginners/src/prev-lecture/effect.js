import { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setCounter((prev) => prev + 1);
  const onChange = (event) => {
    setKeyword(event.target.value);
  };

  // component state가 변경될 때마다 매번 실행되는 코드
  console.log("I run all the time.");

  // useEffect()를 사용, 맨 처음 render될 때만 실행되는 코드
  const iRunOnlyOnce = () => {
    console.log("I run only once.");
  };
  useEffect(iRunOnlyOnce, []);

  // counter 변수가 바뀔 때에만 실행
  useEffect(() => {
    console.log("I run when 'counter' changes");
  }, [counter]);

  // keyword 변수가 바뀔 때에만 실행
  useEffect(() => {
    console.log("I run when 'keyword' changes");
  }, [keyword]);

  // counter 변수 혹은 keyword 변수가 바뀔 때에만 실행
  useEffect(() => {
    console.log("I run when 'counter' or 'keyword' changes");
  }, [counter, keyword]);

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={onChange}
        placeholder="please put your keyword in."
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me!</button>
    </div>
  );
}

export default App;
