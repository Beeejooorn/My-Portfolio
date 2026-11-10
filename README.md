# Portfolio redesign foundation

M1 technical shells only. No final page designs are implemented.

Use Node.js 24 and npm. Run `npm ci`, then `npm run dev`.

Checks: `npm run typecheck`, `npm run lint`, `npm run format:check`,
`npm run test:unit`, `npm run build`, and `npm run test:e2e`.
Browser tests use locally installed Microsoft Edge; install Edge separately if unavailable.

React Router Framework Mode prerenders `/`, `/works`, `/about`, and `/contact`
to `build/client`. Hydration uses the framework entry defaults.
The default render entry requires the explicitly pinned `isbot` utility.
`npm run preview` serves the production client output locally. The local preview resolves clean URLs to their prerendered index files. Hosting configuration
and deployment remain future authorized work. Unknown routes use a basic fallback shell.

Motion is installed for later milestones; no animation is enabled. CSS Modules and
shared CSS tokens are wired with temporary foundation spacing, not final design values.

Legacy tracked `src/`, `images/`, and `public/` files, the old HTML entry,
Tailwind/PostCSS configs and Vite config were removed on the isolated M1 branch.
Their originals remain in Git history at the M0 parent and on master. No legacy or
prototype code or media was imported. The five governance documents are unchanged.
