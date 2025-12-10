import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/index.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("screen", "routes/screen.tsx"),
    route("channel", "routes/channel.tsx"),
    route("playlist", "routes/playlist.tsx"),
    route("media", "routes/media.tsx"),
    route("link", "routes/link.tsx"),
    route("report", "routes/report.tsx"),
    route("ticket", "routes/ticket.tsx"),
  ]),
] satisfies RouteConfig;
