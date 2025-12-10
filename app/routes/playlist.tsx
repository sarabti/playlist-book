import { appName } from "../../constants";
import type { Route } from "./+types/playlist";

export function meta({}: Route.MetaArgs) {
  return [
    { title: appName + " | Playlist" },
    { name: "description", content: "Welcome to Bayacloud!" },
  ];
}

export default function Playlist() {
  return (
    <div>
      <h1 className="text-heading">پلی لیست</h1>
    </div>
  );
}
