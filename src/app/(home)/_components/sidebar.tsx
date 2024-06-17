"use client";

import { BarChart3, Home, Moon, Power, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { setTheme } = useTheme();
  const router = useRouter();
  return (
    <div className="w-16 p-2 md:w-60 flex flex-col justify-between h-dvh fixed">
      <div className="flex flex-col gap-2">
        <div className="h-12 md:h-44 bg-purple-700 rounded-xl"></div>
        <Link
          href="/"
          className="bg-neutral-100 h-12 md:h-14 rounded-xl flex items-center md:px-4 border-2 dark:bg-neutral-900 justify-center md:justify-start"
        >
          <Home className="h-6 w-6 md:h-5 md:w-5" />
          <div className="pl-2 hidden md:block">Home</div>
        </Link>
        <Link
          href="/dashboard"
          className="bg-neutral-100 h-12 md:h-14 rounded-xl flex items-center md:px-4 border-2 dark:bg-neutral-900 justify-center md:justify-start"
        >
          <BarChart3 className="h-6 w-6 md:h-5 md:w-5" />
          <div className="pl-2 hidden md:block">Dashboard</div>
        </Link>
      </div>
      <div className="flex flex-col gap-2 relative">
        <button
          onClick={() => setTheme("light")}
          className="absolute bg-neutral-900 h-12 md:h-10 rounded-lg flex md:px-4 w-full border-2 items-center scale-0 dark:scale-100 justify-center md:justify-start"
        >
          <Sun className="h-6 w-6 md:h-5 md:w-5" />
          <div className="pl-2 hidden md:block">Light mode</div>
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="bg-neutral-100 h-12 md:h-10 rounded-lg flex md:px-4 w-full border-2 items-center scale-100 dark:scale-0 justify-center md:justify-start"
        >
          <Moon className="h-6 w-6 md:h-5 md:w-5" />
          <div className="pl-2 hidden md:block">Dark mode</div>
        </button>
        <Link
          href="/profile"
          className="bg-neutral-100 h-12 md:h-10 rounded-lg flex items-center md:px-4 w-full border-2 dark:bg-neutral-900 justify-center md:justify-start"
        >
          <User className="h-6 w-6 md:h-5 md:w-5" />
          <div className="pl-2 hidden md:block">Profile</div>
        </Link>
      </div>
    </div>
  );
}
