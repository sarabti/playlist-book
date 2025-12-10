"use client";

import {
  Home,
  Film,
  Link,
  FileText,
  MessageCircle,
  TabletSmartphone,
  Folder,
} from "lucide-react";
import clsx from "clsx";
import path from "path";
import { NavLink } from "react-router";

interface SidebarProps {
  mobile?: boolean;
}

export default function Sidebar({ mobile = false }: SidebarProps) {
  const items = [
    { label: "داشبورد", icon: Home, pathName: "/dashboard" },
    { label: "اسکرین", icon: TabletSmartphone, pathName: "/screen" },
    { label: "کانال", icon: Folder, pathName: "/channel" },
    { label: "پلی‌لیست", icon: Folder, pathName: "/playlist" },
    { label: "مدیا", icon: Film, pathName: "/media" },
    { label: "لینک", icon: Link, pathName: "/link" },
    { label: "گزارش‌ها", icon: FileText, pathName: "/report" },
    { label: "تیکت", icon: MessageCircle, pathName: "/ticket" },
  ];

  return (
    <aside
      className={clsx(
        "h-full bg-linear-to-b from-primary-200 to-primary-100",
        "border-l border-border flex flex-col py-6 px-4 text-(--color-text) w-64",
        !mobile && "hidden md:flex"
      )}
    >
      {!mobile && (
        <img
          src="/logo_2.png"
          alt="BayaCloud"
          width={140}
          height={50}
          className="object-contain mx-auto"
        />
      )}
      <nav className="flex flex-col mt-4">
        {items.map(({ label, icon: Icon, pathName }) => (
          <NavLink
            key={label}
            to={pathName}
            className={clsx(
              "flex items-center w-full rounded-xl",
              "hover:bg-white transition-all",
              "text-right py-3 px-2 text-(--color-text-secondary)"
            )}
          >
            <Icon className="w-5 h-5 ml-2" strokeWidth={1} />
            <span className="font-normal text-base">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Version text */}
      <div className="mt-auto text-xs text-gray-500 text-center pb-4">
        V 1.0.1 <br />
        Last version
      </div>
    </aside>
  );
}
