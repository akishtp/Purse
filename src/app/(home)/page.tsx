import Link from "next/link";
import Transactions from "./_components/transactions";

export default function HomePage() {
  return (
    <>
      <Link
        href="/dashboard"
        className="bg-neutral-200 rounded-t-xl flex items-center p-2 dark:bg-neutral-800"
      >
        Transaction
      </Link>
      <Transactions />
    </>
  );
}
