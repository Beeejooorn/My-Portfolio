import { index, route, type RouteConfig } from "@react-router/dev/routes";
export default [
  index("routes/home.tsx"),
  route("works", "routes/works.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
