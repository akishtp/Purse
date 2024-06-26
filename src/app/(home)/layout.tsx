import { validateRequest } from "@/server/lucia";
import Sidebar from "./_components/sidebar";
import { redirect } from "next/navigation";
import AddTransaction from "./_components/addTransaction";
import { AccountStoreProvider } from "@/providers/account-store-provider";
import { TransactionStoreProvider } from "@/providers/transaction-store-provider";
import Accounts from "./_components/accounts";

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
        <div className="flex">
          <Sidebar />

          <div className="flex flex-1 py-2 px-1 ml-16 md:ml-60 lg:mr-[28rem] mr-1 flex-col gap-2">
            <Accounts />
            {children}
          </div>

          <AddTransaction />
        </div>
      </TransactionStoreProvider>
    </AccountStoreProvider>
  );
}
