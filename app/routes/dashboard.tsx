import { appName } from "../../constants";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: appName + " | Dashboard" },
    { name: "description", content: "Welcome to Bayacloud!" },
  ];
}

export default function Dashboard() {
  return <h1>Dashboard</h1>;
}
