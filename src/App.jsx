import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/todoContext";

// APP contains provider and is resposible for rendering layout.
// As well as render order
export default function App() {
  return (
    <>
      <TodoProvider>
        <TodoForm />
        <TodoList />
      </TodoProvider>
    </>
  );
}
