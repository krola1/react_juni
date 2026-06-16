import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

// As well as render order
export default function App() {
  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
}
