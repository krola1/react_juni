import TodoCard from "./TodoCard";

//responible for rendering list
export default function TodoList({ todos, todoToggle }) {
  return (
    <>
      {todos.map((todo) => (
        <TodoCard key={todo.id} {...todo} onToggle={todoToggle} />
      ))}
    </>
  );
}
