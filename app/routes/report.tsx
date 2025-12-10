import { appName } from "../../constants";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: appName + " | Report" },
    { name: "description", content: "Welcome to Bayacloud!" },
  ];
}

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-heading">گزارش‌ها</h1>
    </div>
  );
}
