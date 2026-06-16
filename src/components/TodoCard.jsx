import { useTodo } from "../context/todoContext";

export default function TodoCard({
  title,
  createdAt,
  id,
  completed,
  favorite,
  description,
}) {
  // from context
  const { todoToggle: onToggle, deleteTodo: onDelete } = useTodo();
  // format "Date.now()" into human readable format
  const date = new Date(createdAt).toLocaleString();
  return (
    <div style={{ border: "solid white" }}>
      <h1>{title}</h1>
      <p>{date}</p>
      {/* -------------------------------------------- */}
      <label>
        <input
          type="checkbox"
          name=""
          checked={completed}
          onChange={() => onToggle(id, "completed")}
        />
        completed
      </label>

      {/* ------------------------------------ */}
      <label>
        <input
          type="checkbox"
          name=""
          checked={favorite}
          onChange={() => onToggle(id, "favorite")}
        />
        favorite
      </label>
      <section>Description{description}</section>
      <button>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}
