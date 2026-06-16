/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useLocalstorage } from "../hooks/useLocalstorage";

const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useLocalstorage("todo_juni");

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

  //toggles true/false fields, takes key as string value
  const todoToggle = (id, key) => {
    setTodos((prev) =>
      prev.map((todo) =>
        id === todo.id ? { ...todo, [key]: !todo[key] } : todo,
      ),
    );
  };
  // filter returns all instances where todo.id DOES NOT match provided id
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const value = {
    todos,
    addTodo,
    todoToggle,
    deleteTodo,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("TodoContext must be used within TodoProvider");
  }
  return context;
};
