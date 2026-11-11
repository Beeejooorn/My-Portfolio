import { useState } from "react";
import styles from "./RouteShell.module.css";
export function RouteShell({ title }: { title: string }) {
  const [count, setCount] = useState(0);
  return (
    <main tabIndex={-1} id="main" className={styles.shell}>
      <h1>{title}</h1>
      <p>Application foundation.</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Hydration check: {count}
      </button>
    </main>
  );
}
