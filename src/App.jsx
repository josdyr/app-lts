import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Table({ value }) {
  return <table className="table">Hi Table</table>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <p>Hello World!</p>
      </div>
      <div className="table">
        <Table />
      </div>
    </>
  );
}

export default App;
