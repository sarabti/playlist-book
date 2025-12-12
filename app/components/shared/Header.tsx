"use client";

import { Menu, Search, Settings, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/Sheet";
import Sidebar from "./Sidebar";
import PageNav from "./PageNav";

export default function Header() {
  return (
    <header className="w-full h-16 bg-white border-b border-border flex items-center justify-between px-5">
      <div className="hidden md:block">
        <PageNav />
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-7 h-7 text-gray-700" />
          </SheetTrigger>

          <SheetContent side="right" className="p-0 w-64 rtl">
            <SheetTitle></SheetTitle>
            <Sidebar mobile />

            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </div>

      <img
        src="/logo_1.png"
        alt="BayaCloud"
        width={140}
        height={40}
        className="md:hidden object-contain"
      />
      <div className="hidden md:block w-6"></div>

      <div className="flex items-center gap-3">
        <Search
          className="md:hidden w-6 h-6 text-gray-700"
          strokeWidth={"1.5px"}
        />
        <Settings
          className="hidden md:block w-6 h-6 text-gray-700"
          strokeWidth={"1.5px"}
        />
        <User
          className="hidden md:block w-6 h-6 text-gray-700"
          strokeWidth={"1.5px"}
        />
      </div>
    </header>
  );
}
