"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme } = useTheme();
  return (
    <div className="light:border-neutral-100 border-b-2 dark:border-neutral-900">
      <div className="container flex h-16 items-center justify-between">
        <div>Purse</div>
        <div className="flex items-center gap-4">
          <a href="http://github.com/akishtp/purse" className="light:hidden">
            <Image
              priority
              src="/github-dark.svg"
              width={24}
              height={24}
              alt="Github"
            />
          </a>
          <a href="http://github.com/akishtp/purse" className="dark:hidden">
            <Image
              priority
              src="/github-light.svg"
              width={24}
              height={24}
              alt="Github"
            />
          </a>
          <button onClick={() => setTheme("dark")}>dark</button>
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
