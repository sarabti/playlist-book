import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/index.tsx"),
    route("playlist", "routes/playlist.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("screen", "routes/screen.tsx"),
  ]),
] satisfies RouteConfig;
