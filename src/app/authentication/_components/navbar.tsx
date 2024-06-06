"use client";

import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function Navbar() {
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="light:border-neutral-100 border-b-2 dark:border-neutral-900">
      <div className="container flex h-16 items-center justify-between">
        <div>Purse</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <button
              onClick={() => setTheme("light")}
              className="absolute h-6 w-6 scale-0 dark:rotate-0 dark:scale-100"
            >
              <img src="/light-icon.svg" alt="light-mode" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className="h-6 w-6 scale-100 dark:-rotate-90 dark:scale-0"
            >
              <img src="/dark-icon.svg" alt="dark-mode" />
            </button>
          </div>
          <a href="https://github.com/akishtp/purse">
            <img
              src="/icons/github-light-icon.svg"
              alt="github"
              className="absolute h-6 w-6 scale-0 dark:rotate-0 dark:scale-100"
            />
            <img
              src="/icons/github-dark-icon.svg"
              alt="github"
              className="h-6 w-6 scale-100 dark:-rotate-90 dark:scale-0"
            />
          </a>
          {pathname === "/authentication/register" ? (
            <Button onClick={() => router.push("/authentication/signin")}>
              Sign In
            </Button>
          ) : (
            <Button onClick={() => router.push("/authentication/register")}>
              Register
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
