import SideNav from "../ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-row">
      <div className="w-1/5 p-2">
        <SideNav />
      </div>
      <div className="w-4/5 p-12 bg-neutral-900">{children}</div>
    </div>
  );
}
