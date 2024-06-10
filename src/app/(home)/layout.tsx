import { Sidebar } from "@/components/sidebar";
import { validateRequest } from "@/server/lucia";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/auth/login");
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      {children}
      <div className="w-4/12 p-2">
        <div className="bg-blue-500 rounded-2xl h-full">h</div>
      </div>
    </div>
  );
}
