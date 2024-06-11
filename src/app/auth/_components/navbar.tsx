"use client";

import { Button } from "@/components/ui/button";
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
            src={"/logos/purse-light.svg"}
            width={150}
            height={30}
            alt="purse"
            priority
          />
        </div>
        <div className="scale-100 dark:scale-0 flex gap-4">
          <Image
            src={"/logos/purse-dark.svg"}
            width={150}
            height={30}
            alt="purse"
            priority
          />
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <div className="flex scale-0 dark:scale-100 absolute gap-4">
              <button onClick={() => setTheme("light")}>
                <Image
                  src="/icons/light.svg"
                  width={24}
                  height={24}
                  alt="light"
                />
              </button>
              <a href="https://www.github.com/akishtp/purse">
                <Image
                  src="/logos/github-light.svg"
                  width={24}
                  height={24}
                  alt="github"
                />
              </a>
            </div>
            <div className="scale-100 dark:scale-0 flex gap-4">
              <button onClick={() => setTheme("dark")}>
                <Image
                  src="/icons/dark.svg"
                  width={24}
                  height={24}
                  alt="dark"
                />
              </button>
              <a href="https://www.github.com/akishtp/purse">
                <Image
                  src={"/logos/github-dark.svg"}
                  width={24}
                  height={24}
                  alt="github"
                />
              </a>
            </div>
          </div>
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
