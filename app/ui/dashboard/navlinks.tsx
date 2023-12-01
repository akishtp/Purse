"use client";

import { HomeIcon, WalletIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Links = [
  {
    name: "Home",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Records",
    href: "/dashboard/records",
    icon: WalletIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {Links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `bg-neutral-900 h-14 flex items-center rounded-xl p-3 hover:bg-neutral-800 my-1`,
              { "bg-neutral-700": pathname === link.href }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="pl-2">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
