import { useState, type FormEvent } from "react";
import styles from "./Contact.module.css";

export const meta = () => [{ title: "Contact — Bjorn Tanamal" }];
const categories = [
  "Website development",
  "Website design",
  "Collaboration",
  "Other",
];
type Field = "name" | "email" | "details";
type Errors = Partial<Record<Field, string>>;

function validate(field: Field, input: HTMLInputElement | HTMLTextAreaElement) {
  if (!input.value.trim())
    return {
      name: "Enter your name.",
      email: "Enter your email address.",
      details: "Tell me a little about your project.",
    }[field];
  if (field === "email" && input.validity.typeMismatch)
    return "Use an email address such as name@example.com.";
}

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [checked, setChecked] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    let first: HTMLElement | undefined;
    for (const field of ["name", "email", "details"] as const) {
      const input = event.currentTarget.elements.namedItem(field);
      if (!(
        input instanceof HTMLInputElement ||
        input instanceof HTMLTextAreaElement
      ))
        continue;
      const message = validate(field, input);
      if (message) {
        next[field] = message;
        first ??= input;
      }
    }
    setErrors(next);
    setChecked(!first);
    first?.focus();
  }
  function edit(event: FormEvent<HTMLFormElement>) {
    setChecked(false);
    const el = event.target;
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement))
      return;
    const key = el.name;
    if ((key === "name" || key === "email" || key === "details") && errors[key])
      setErrors({ ...errors, [key]: validate(key, el) });
  }
  function attributes(field: Field) {
    return {
      id: field,
      name: field,
      required: true,
      "aria-invalid": errors[field] ? true : undefined,
      "aria-describedby": errors[field] ? field + "-error" : undefined,
    };
  }
  function error(field: Field) {
    return (
      errors[field] && (
        <small id={field + "-error"} className={styles.error}>
          {errors[field]}
        </small>
      )
    );
  }
  return (
    <main className={styles.page} id="main" tabIndex={-1}>
      <header>
        <h1>LET'S TALK.</h1>
        <p>Tell me a little about what you're working on.</p>
      </header>
      {/* A dialog-method form has no HTTP fallback before hydration. */}
      <form
        method="dialog"
        noValidate
        onSubmit={submit}
        onInput={edit}
        aria-label="Project inquiry"
      >
        <div className={styles.pair}>
          <div>
            <label htmlFor="name">
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              {...attributes("name")}
              type="text"
              autoComplete="name"
              maxLength={160}
            />
            {error("name")}
          </div>
          <div>
            <label htmlFor="email">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              {...attributes("email")}
              type="email"
              autoComplete="email"
              maxLength={254}
            />
            {error("email")}
          </div>
        </div>
        <fieldset>
          <legend>What can I help you with?</legend>
          <div className={styles.choices}>
            {categories.map((category) => (
              <label key={category}>
                <input type="checkbox" name="category" value={category} />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label htmlFor="details">
          Tell me about your project <span aria-hidden="true">*</span>
        </label>
        <textarea {...attributes("details")} rows={4} />
        {error("details")}
        <div className={styles.actions}>
          <div>
            Prefer email? Contact me directly.
            <small>Email address pending</small>
          </div>
          <div className={styles.send}>
            <button type="submit" aria-describedby="delivery">
              Send inquiry ↗
            </button>
            <small id="delivery" role="status">
              {checked
                ? "Details checked · no inquiry sent"
                : "Demo only · no email delivery"}
            </small>
          </div>
        </div>
        <noscript>
          Enable JavaScript to check the form. No inquiry will be sent.
        </noscript>
      </form>
    </main>
  );
}
