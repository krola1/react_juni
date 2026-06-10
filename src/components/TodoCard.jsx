export default function TodoCard({
  title,

  createdAt,
  id,
  completed,
  favorite,
  description,
  onToggle,
}) {
  const date = new Date(createdAt).toLocaleString();
  return (
    <div style={{ border: "solid white" }}>
      <h1>{title}</h1>
      <p>{date}</p>
      <label>
        <input
          type="checkbox"
          name=""
          checked={completed}
          onChange={() => onToggle(id, "completed")}
        />
        completed
      </label>
      <label>
        <input
          type="checkbox"
          name=""
          checked={favorite}
          onChange={() => onToggle(id, "favorite")}
        />
        favorite
      </label>
      <section>description{description}</section>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}
