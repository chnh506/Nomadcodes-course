import { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const onChange = (event) => {
    setTodo(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (todo === "") return;

    setTodos((curArr) => [todo, ...curArr]);
    setTodo("");
  };

  return (
    <div>
      <h1>My To-Dos ({todos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          value={todo}
          onChange={onChange}
          type="text"
          placeholder="Write your to dos..."
        />
        <button>Add To Do</button>
      </form>

      <hr />

      <ul>
        {todos.map((item, idx) => {
          return <li key={idx}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
