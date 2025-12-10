"use client";

import {
  Home,
  Film,
  Layers,
  Images,
  Link,
  FileText,
  MessageCircle,
} from "lucide-react";
import clsx from "clsx";

interface SidebarProps {
  mobile?: boolean;
}

export default function Sidebar({ mobile = false }: SidebarProps) {
  const items = [
    { label: "داشبورد", icon: Home },
    { label: "اسکریپت", icon: Film },
    { label: "کانال", icon: Layers },
    { label: "مدیا", icon: Images },
    { label: "لینک", icon: Link },
    { label: "گزارش‌ها", icon: FileText },
    { label: "تیکت", icon: MessageCircle },
  ];

  return (
    <aside
      className={clsx(
        "h-full bg-gradient-to-b from-[var(--color-sidebar-start)] to-[var(--color-sidebar-end)]",
        "border-l border-border flex flex-col py-6 px-4 text-[var(--color-text)] w-64",
        !mobile && "hidden md:flex"
      )}
    >
      <nav className="flex flex-col gap-4 mt-4">
        {items.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className={clsx(
              "flex items-center justify-between w-full px-4 py-3 rounded-xl",
              "hover:bg-white hover:shadow-sm transition-all",
              "text-right"
            )}
          >
            <span className="font-medium text-base">{label}</span>
            <Icon className="w-5 h-5" />
          </button>
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
