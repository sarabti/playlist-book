import { appName } from "../constants";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: appName + " | Link" },
    { name: "description", content: "Welcome to Bayacloud!" },
  ];
}

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-heading">لینک</h1>
    </div>
  );
}
