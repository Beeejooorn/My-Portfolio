import { lazy, Suspense, type ReactNode } from "react";
import { useLocalMotionReview } from "./motion-review";
import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import "./styles/tokens.css";
import { RouteReveal } from "./components/RouteReveal";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
const LocalMotionReview = import.meta.env.DEV
  ? lazy(() => import("./components/LocalMotionReview"))
  : null;
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
  const review = useLocalMotionReview();
  return (
    <>
      <Navbar />
      <RouteReveal />
      <Footer />
      {review && LocalMotionReview && (
        <Suspense fallback={null}>
          <LocalMotionReview />
        </Suspense>
      )}
    </>
  );
}
