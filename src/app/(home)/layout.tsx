import { validateRequest } from "@/server/lucia";
import Sidebar from "./_components/sidebar";
import { redirect } from "next/navigation";
import AddTransaction from "./_components/addTransaction";
import { AccountStoreProvider } from "@/providers/account-store-provider";
import { TransactionStoreProvider } from "@/providers/transaction-store-provider";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth/login");
  }

  return (
    <AccountStoreProvider>
      <TransactionStoreProvider>
        <div className="flex h-dvh">
          <Sidebar />

          <div className="flex flex-1 py-2 px-1">
            <div className="flex flex-col w-full rounded-2xl bg-neutral-100 p-4 border-2 dark:bg-neutral-900">
              {children}
            </div>
          </div>

          <AddTransaction />
        </div>
      </TransactionStoreProvider>
    </AccountStoreProvider>
  );
}
