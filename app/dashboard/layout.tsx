import SideNav from "../ui/dashboard/sidenav";

export default function Layout ({ children }: {children: React.ReactNode }) {
    return (
        <div className="h-screen flex flex-row">
            <div className="w-80">
                <SideNav />
            </div>
            <div className="flex-grow p-12">{children}</div>
        </div>
    );
}