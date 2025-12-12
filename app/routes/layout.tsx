import Header from "~/components/shared/Header";
import PageNav from "~/components/shared/PageNav";
import Sidebar from "~/components/shared/Sidebar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="h-screen flex flex-row overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 flex flex-col overflow-auto p-4">
          <div className="md:hidden mb-2">
            <PageNav />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
