import { Sidebar } from "@/app/(home)/_components/sidebar";
import { validateRequest } from "@/server/lucia";
import { redirect } from "next/navigation";
import { AddTransaction } from "./_components/addTransaction";

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
      <AddTransaction />
    </div>
  );
}
