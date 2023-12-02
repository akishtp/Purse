import Link from "next/link";

export default function Page() {
  return (
    <main className="flex justify-center items-center h-screen">
      <Link href="/dashboard">
        <button className="hover:bg-violet-800 text-gray-100 font-semibold py-2 px-4 border border-violet-950 rounded shadow bg-violet-700">
          Login 🔓
        </button>
      </Link>
    </main>
  );
}
