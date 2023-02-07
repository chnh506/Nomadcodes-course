import Button from "./Button";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <h1 className={styles.title}>Create React App!</h1>
      <Button text="Hello!" />
    </div>
  );
}

export default App;
