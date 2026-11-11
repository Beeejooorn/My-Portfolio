import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "./styles/tokens.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { SmoothReveal } from "./components/SmoothReveal";
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
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export default function App() {
  return (
    <>
      <Navbar />
      <SmoothReveal>
        <Outlet />
      </SmoothReveal>
      <Footer />
    </>
  );
}
