import SideNav from "../ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-row">
      <div className="w-1/6 p-2">
        <SideNav />
      </div>
      <div className="w-5/6 p-2">{children}</div>
    </div>
  );
}
