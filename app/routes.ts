import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("playlist", "routes/playlist.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("screen", "routes/screen.tsx"),
] satisfies RouteConfig;
