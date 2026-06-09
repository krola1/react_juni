//responible for rendering list
export default function TodoList({ todos }) {
  return (
    <>
      {todos.map((todo, i) => (
        <p key={i}>{todo}</p>
      ))}
    </>
  );
}
