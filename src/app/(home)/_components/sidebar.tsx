"use client";

import { logout } from "@/actions/auth.actions";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  return (
    <nav className="w-2/12 flex flex-col justify-between p-2">
      <div className="flex flex-col gap-2">
        <div className="h-48 bg-purple-700 rounded-2xl flex items-end px-3 py-2">
          Purse
        </div>
        <Link href="/">
          <div
            className={`h-16 rounded-xl text-lg flex items-center gap-2 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-700 ${
              pathname === "/"
                ? "bg-neutral-200 dark:bg-neutral-800"
                : "bg-neutral-100 dark:bg-neutral-900"
            }`}
          >
            <img
              src="/icons/light.svg"
              alt="purse"
              className="h-8 scale-0 dark:scale-100 absolute"
            />
            <img
              src="/icons/dark.svg"
              alt="purse"
              className="h-8 scale-100 dark:scale-0"
            />
            <div>Home</div>
          </div>
        </Link>
        <Link href="/dashboard">
          <div
            className={`h-16 rounded-xl text-lg flex items-center gap-2 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-700 ${
              pathname === "/dashboard"
                ? "bg-neutral-200 dark:bg-neutral-800"
                : "bg-neutral-100 dark:bg-neutral-900"
            }`}
          >
            <img
              src="/icons/light.svg"
              alt="purse"
              className="h-8 scale-0 dark:scale-100 absolute"
            />
            <img
              src="/icons/dark.svg"
              alt="purse"
              className="h-8 scale-100 dark:scale-0"
            />
            <div>Dashboard</div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-full relative">
          <div className="flex scale-0 dark:scale-100 absolute gap-4 w-full">
            <button
              onClick={() => setTheme("light")}
              className="w-full h-12 rounded-xl flex gap-2 items-center px-3 bg-neutral-900 hover:bg-neutral-700"
            >
              <img src="/icons/light.svg" alt="switch to" className="h-6" />
              <div>light</div>
            </button>
          </div>
          <div className="scale-100 dark:scale-0 flex gap-4">
            <button
              onClick={() => setTheme("dark")}
              className="w-full h-12 bg-neutral-100 gap-2 rounded-xl flex items-center px-3 hover:bg-neutral-300"
            >
              <img src="/icons/dark.svg" alt="switch to" className="h-6" />
              dark
            </button>
          </div>
        </div>
        <form action={logout}>
          <button className="h-12 bg-neutral-100 gap-2 rounded-xl flex items-center px-3 w-full hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-700">
            <img
              src="/icons/light.svg"
              alt="purse"
              className="h-6 scale-0 dark:scale-100 absolute"
            />
            <img
              src="/icons/dark.svg"
              alt="purse"
              className="h-6 scale-100 dark:scale-0"
            />
            <div>Logout</div>
          </button>
        </form>
      </div>
    </nav>
  );
};
