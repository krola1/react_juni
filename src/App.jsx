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
    //todo object
    const newTodo = {
      id: crypto.randomUUID(),
      title: text,
      createdAt: Date.now(),
      completed: false,
      favorite: false,
      description: "N/A",
    };
    setTodos((prev) => [...prev, newTodo]);
  };
  //NEW !!
  //toggles true/false fields, takes key as string value
  const todoToggle = (id, key) => {
    setTodos((prev) =>
      prev.map((todo) =>
        id === todo.id ? { ...todo, [key]: !todo[key] } : todo,
      ),
    );
  };

  return (
    <>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} todoToggle={todoToggle} />
    </>
  );
}
