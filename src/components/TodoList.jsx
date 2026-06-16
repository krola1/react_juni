import { useTodo } from "../context/todoContext";
import TodoCard from "./TodoCard";

//responible for rendering list
export default function TodoList() {
  const { todos } = useTodo();

  return (
    <>
      {todos.map((todo) => (
        <TodoCard key={todo.id} {...todo} />
      ))}
    </>
  );
}
