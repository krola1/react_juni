# useState

`useState` er en av de viktigste **hookene** i React. Den lar en komponent
_huske_ informasjon mellom hver gang den tegnes på nytt (re-render). Denne typen
informasjon kaller vi **state** (tilstand).

> 💡 En _hook_ er en spesiell funksjon i React som starter med `use`. Hooks må
> alltid kalles øverst i en komponent, aldri inne i løkker, betingelser eller
> nøstede funksjoner.

---

## 1. Hvorfor trenger vi state?

Tenk deg at du prøver å lagre en verdi i en vanlig variabel:

```jsx
function Teller() {
  let antall = 0;

  return (
    <button onClick={() => (antall = antall + 1)}>
      Klikket {antall} ganger
    </button>
  );
}
```

Dette **fungerer ikke** slik vi ønsker. Når du klikker, endres `antall` i minnet,
men React vet ikke at den skal tegne komponenten på nytt — så tallet på skjermen
står fortsatt på `0`. I tillegg nullstilles variabelen hver gang komponenten
kjøres.

State løser begge problemene:

1. React **husker** verdien mellom hver render.
2. Når state endres, **tegner React komponenten på nytt** automatisk.

---

## 2. Syntaks

```jsx
import { useState } from "react";

const [verdi, setVerdi] = useState(startverdi);
```

`useState` returnerer et **array med to elementer**, og vi bruker
[array-destrukturering](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
for å hente dem ut:

| Del         | Hva er det?                                            |
| ----------- | ------------------------------------------------------ |
| `verdi`     | Den nåværende verdien til staten.                      |
| `setVerdi`  | En funksjon som oppdaterer verdien og ber om re-render.|
| `startverdi`| Verdien staten har **første** gang komponenten kjøres. |

> 🏷️ Navnekonvensjon: kall oppdateringsfunksjonen `setNoe`, der `Noe` er navnet
> på staten. F.eks. `text` / `setText`, `todos` / `setTodos`.

---

## 3. Eksempel fra dette prosjektet

I [`src/components/TodoForm.jsx`](../src/components/TodoForm.jsx) brukes state til
å holde styr på teksten brukeren skriver i input-feltet:

```jsx
import { useState } from "react";

export default function TodoForm({ onAdd }) {
  // initialiser state med en tom streng
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText(""); // tøm feltet etter innsending
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
      />
      <button>add</button>
    </form>
  );
}
```

Hva skjer her?

1. `text` starter som en tom streng `""`.
2. Hver gang brukeren skriver, kalles `setText(e.target.value)` som oppdaterer
   staten til den nye teksten.
3. React tegner komponenten på nytt, og `value={text}` viser den oppdaterte
   teksten i feltet.
4. Når skjemaet sendes inn, tømmes feltet med `setText("")`.

Dette mønsteret — der input-feltets `value` styres av state — kalles en
**controlled component** (kontrollert komponent).

---

## 4. Oppdatering basert på forrige verdi

Noen ganger er den nye verdien avhengig av den gamle. Da bør du sende en
**funksjon** til set-funksjonen i stedet for en ny verdi direkte. Se
[`src/App.jsx`](../src/App.jsx):

```jsx
const [todos, setTodos] = useState([]);

const addTodo = (text) => {
  setTodos((prev) => [...prev, text]); // prev = forrige liste
};
```

Her får funksjonen `prev` (den forrige verdien) som argument, og vi returnerer en
**ny** liste som inneholder alt fra før pluss det nye elementet.

> ✅ Bruk `setTodos((prev) => ...)` når den nye verdien bygger på den gamle.
> Det er tryggere enn `setTodos([...todos, text])` fordi du alltid får den
> nyeste verdien.

---

## 5. State er **immutabel** — ikke endre den direkte!

Du skal **aldri** endre state direkte. React oppdager bare endringer når du
kaller set-funksjonen med en _ny_ verdi/objekt/array.

```jsx
// ❌ FEIL – muterer arrayen direkte, React tegner ikke på nytt
todos.push("Vaske opp");
setTodos(todos);

// ✅ RIKTIG – lager en ny array
setTodos((prev) => [...prev, "Vaske opp"]);
```

Det samme gjelder objekter:

```jsx
// ❌ FEIL
bruker.navn = "Kari";
setBruker(bruker);

// ✅ RIKTIG – spre det gamle objektet og overskriv feltet
setBruker((prev) => ({ ...prev, navn: "Kari" }));
```

---

## 6. Vanlige feil

| Feil                                                        | Løsning                                                              |
| ----------------------------------------------------------- | ------------------------------------------------------------------- |
| Endrer en vanlig variabel og forventer re-render            | Bruk `useState`.                                                    |
| Muterer state direkte (`push`, `=`, osv.)                   | Lag en ny array/objekt med spread `...`.                            |
| Kaller `useState` inne i en `if` eller løkke                | Kall hooks alltid øverst i komponenten.                             |
| Forventer at `verdi` er oppdatert med en gang etter `set`   | State oppdateres ved **neste** render, ikke umiddelbart.            |
| Glemmer startverdi som passer typen (`""`, `[]`, `0`, `false`) | Velg en startverdi som matcher hvordan staten skal brukes.       |

---

## 7. Oppsummering

- `useState` gir komponenten en **hukommelse** som overlever re-renders.
- Den returnerer `[verdi, setVerdi]`.
- Kall `setVerdi(...)` for å oppdatere — **aldri** endre staten direkte.
- Bruk funksjonsformen `setVerdi(prev => ...)` når ny verdi bygger på den gamle.
- Når state endres, tegner React komponenten på nytt automatisk.

---

### Les mer

- React-dokumentasjon: [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- React-dokumentasjon: [`useState`](https://react.dev/reference/react/useState)
