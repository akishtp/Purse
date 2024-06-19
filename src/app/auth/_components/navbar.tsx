"use client";

import { Button } from "@/components/ui/button";
import { Github, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  return (
    <nav className="border-b-2 bg-neutral-100 border-neutral-300 dark:bg-neutral-900 dark:border-neutral-800">
      <div className="h-16 container flex items-center justify-between">
        <div className="flex scale-0 dark:scale-100 absolute gap-4">
          <Image
            src="/logo-light.svg"
            width={150}
            height={30}
            alt="purse"
            priority
          />
        </div>
        <div className="scale-100 dark:scale-0 flex gap-4">
          <Image
            src="/logo-dark.svg"
            width={150}
            height={30}
            alt="purse"
            priority
          />
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setTheme("light")}
            className="absolute bg-neutral-900 h-12 md:h-10 rounded-lg flex items-center scale-0 dark:scale-100 justify-center md:justify-start"
          >
            <Sun className="h-6 w-6" />
          </button>
          <button
            onClick={() => setTheme("dark")}
            className="bg-neutral-100 h-12 md:h-10 rounded-lg flex items-center scale-100 dark:scale-0 justify-center md:justify-start"
          >
            <Moon className="h-6 w-6" />
          </button>
          <a href="https://www.github.com/akishtp/purse">
            <Github className="h-6 w-6" />
          </a>
          {pathname === "/auth/login" ? (
            <Button asChild>
              <Link href="/auth/signup">Signup</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
