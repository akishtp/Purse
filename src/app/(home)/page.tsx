import Link from "next/link";
import Accounts from "./_components/Accounts";
import Transactions from "./_components/transactions";

export default function HomePage() {
  return (
    <>
      <Accounts />
      <Link
        href="/dashboard"
        className="mt-2 bg-neutral-200 rounded-t-xl flex items-center p-2 dark:bg-neutral-800"
      >
        Transaction
      </Link>
      <Transactions />
    </>
  );
}
