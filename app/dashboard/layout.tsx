"use client";

import AddRecords from "../ui/dashboard/addrecords";
import SideNav from "../ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-row">
      <div className="w-1/6 p-2 fixed h-screen">
        <SideNav />
      </div>
      <div className="py-2 px-1 main-content">{children}</div>
      <div className="left-content p-2 fixed right-0">
        <AddRecords />
      </div>
    </div>
  );
}
