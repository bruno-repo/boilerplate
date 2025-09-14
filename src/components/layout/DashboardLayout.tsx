import { Outlet } from "react-router-dom";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Sidebar (desktop) */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6 container max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
