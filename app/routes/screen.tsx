import type { Route } from "./+types/screen";
import { appName } from "../../constants";

export function meta({}: Route.MetaArgs) {
  return [
    { title: appName + " | Screen" },
    { name: "description", content: "Welcome to Bayacloud!" },
  ];
}

export default function Screen() {
  return <h1>Screen</h1>;
}
