# Props

**Props** (kort for _properties_) er måten vi sender data **fra en
forelder-komponent til en barn-komponent** i React. Du kan tenke på props som
argumentene til en komponent — akkurat som en vanlig funksjon kan ta imot
argumenter.

---

## 1. Hvorfor trenger vi props?

React-apper bygges opp av mange små komponenter. For at de skal kunne samarbeide,
må de kunne **dele data**. Props lar en forelder gi barnet akkurat den
informasjonen det trenger.

```
   App  (har dataen)
   │
   ├── TodoForm   ← får funksjonen onAdd som prop
   └── TodoList   ← får listen todos som prop
```

Dataen "flyter nedover" — fra forelder til barn. Dette kalles **one-way data
flow** (enveis dataflyt).

---

## 2. Å sende props (forelderen)

Du sender props på samme måte som HTML-attributter, men verdier som ikke er ren
tekst skrives inne i `{ }`. Se [`src/App.jsx`](../src/App.jsx):

```jsx
export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos((prev) => [...prev, text]);
  };

  return (
    <>
      <TodoForm onAdd={addTodo} />   {/* sender en funksjon som prop */}
      <TodoList todos={todos} />     {/* sender en array som prop */}
    </>
  );
}
```

Her sender `App`:

- Propen `onAdd` (en **funksjon**) til `TodoForm`.
- Propen `todos` (en **array**) til `TodoList`.

> 💡 Navnet til venstre for `=` (f.eks. `onAdd`) er det navnet barnet mottar
> propen under. Du bestemmer navnet selv.

---

## 3. Å motta props (barnet)

Barn-komponenten mottar et **objekt** med alle props som første parameter. Det er
veldig vanlig å bruke **destrukturering** for å plukke ut feltene direkte.

### Med destrukturering (anbefalt)

Se [`src/components/TodoList.jsx`](../src/components/TodoList.jsx):

```jsx
export default function TodoList({ todos }) {
  return (
    <>
      {todos.map((todo, i) => (
        <p key={i}>{todo}</p>
      ))}
    </>
  );
}
```

### Uten destrukturering (samme resultat)

```jsx
export default function TodoList(props) {
  return (
    <>
      {props.todos.map((todo, i) => (
        <p key={i}>{todo}</p>
      ))}
    </>
  );
}
```

Begge gjør det samme. Destrukturering (`{ todos }`) er bare en kortere og mer
leselig måte å skrive `props.todos` på.

---

## 4. Funksjoner som props (callbacks)

Props trenger ikke være data — de kan også være **funksjoner**. Dette er hvordan
et barn kan "si fra" til forelderen at noe har skjedd.

I [`src/components/TodoForm.jsx`](../src/components/TodoForm.jsx) mottar skjemaet
funksjonen `onAdd` og kaller den når brukeren sender inn:

```jsx
export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd(text); // ber forelderen (App) legge til en ny todo
    setText("");
  };

  // ...
}
```

Flyten blir slik:

1. `App` eier listen `todos` og funksjonen `addTodo`.
2. `App` sender `addTodo` ned til `TodoForm` under navnet `onAdd`.
3. Når brukeren sender inn skjemaet, kaller `TodoForm` `onAdd(text)`.
4. Det kjører `addTodo` i `App`, som oppdaterer staten.
5. `App` tegnes på nytt og sender den nye listen ned til `TodoList`.

Dette mønsteret — data ned, hendelser opp — er kjernen i hvordan React-komponenter
samarbeider.

---

## 5. Props er **read-only** (skrivebeskyttet)

Et barn skal **aldri** endre sine egne props. Props "eies" av forelderen.

```jsx
function TodoList({ todos }) {
  todos.push("Juks"); // ❌ FEIL – ikke endre props!
  // ...
}
```

Hvis et barn trenger å endre noe, skal det enten:

- ha sin egen **state** (`useState`), eller
- kalle en **funksjon-prop** som forelderen har sendt ned (som `onAdd`).

---

## 6. `children`-propen

Det finnes en spesiell prop som heter `children`. Den inneholder alt du skriver
_mellom_ åpne- og lukketaggen til en komponent:

```jsx
function Kort({ children }) {
  return <div className="kort">{children}</div>;
}

// Bruk:
<Kort>
  <h2>Hei!</h2>
  <p>Dette havner i children.</p>
</Kort>;
```

---

## 7. Vanlige feil

| Feil                                                       | Løsning                                                         |
| ---------------------------------------------------------- | -------------------------------------------------------------- |
| Prøver å endre en prop inne i barnet                       | Props er read-only. Bruk state eller en funksjon-prop.         |
| Glemmer `{ }` rundt en verdi som ikke er tekst             | `todos={todos}`, ikke `todos=todos`.                           |
| Glemmer destrukturering og skriver `todos` i stedet for `props.todos` | Enten destrukturer `{ todos }` eller bruk `props.todos`. |
| Sender data "oppover" direkte                              | Data flyter nedover. Send heller en callback-funksjon ned.     |
| Ulikt navn ved sending og mottak                          | Navnet i forelderen (`onAdd={...}`) må matche i barnet (`{ onAdd }`). |

---

## 8. Oppsummering

- **Props** sender data fra forelder til barn.
- Du sender dem som attributter: `<TodoList todos={todos} />`.
- Du mottar dem som et objekt, ofte med destrukturering: `function TodoList({ todos })`.
- Props kan være hva som helst: tall, tekst, arrays, objekter — og **funksjoner**.
- Props er **read-only**. Trenger barnet å endre noe, brukes state eller en callback.
- Dataflyten er enveis: **data ned, hendelser opp**.

---

### Les mer

- React-dokumentasjon: [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- React-dokumentasjon: [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
