import type { ReactNode } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "react-router";
import "./styles/tokens.css";
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:," />
        <Meta />
        <Links />
      </head>
      <body>
        <a href="#main">Skip to content</a>
        <nav aria-label="Foundation routes">
          <Link to="/">Homepage</Link> <Link to="/works">Works</Link>{" "}
          <Link to="/about">About</Link> <Link to="/contact">Contact</Link>
        </nav>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export default function App() {
  return <Outlet />;
}
