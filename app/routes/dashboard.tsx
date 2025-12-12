import { appName } from "../constants";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: appName + " | Dashboard" },
    { name: "description", content: "Welcome to Bayacloud!" },
  ];
}

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-heading">داشبورد</h1>
    </div>
  );
}
