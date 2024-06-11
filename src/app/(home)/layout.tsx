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
    <div className="h-screen flex">
      <Sidebar />

      <div className="flex flex-1 pt-2 px-1">
        <div className="rounded-2xl w-full p-4 bg-neutral-200 dark:bg-neutral-900">
          {children}
        </div>
      </div>

      <AddTransaction />
    </div>
  );
}
