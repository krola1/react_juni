import { useState } from "react";

// responsible for recieving user input
export default function TodoForm({ onAdd }) {
  //initialize state
  const [text, setText] = useState("");

  // Function for actions on subimiting form.
  // preventdefault stops page from refreshing on submit witch is default behaviour.
  const onSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit} action="">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
      />
      <button>add</button>
    </form>
  );
}
