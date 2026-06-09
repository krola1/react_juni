import { useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

// App.jsx owns shared states, and functions for editing theese.
// As well as render order
export default function App() {
  const [todos, setTodos] = useState([]);

  ///function for adding elements to array
  const addTodo = (text) => {
    setTodos((prev) => [...prev, text]);
  };

  return (
    <>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} />
    </>
  );
}
