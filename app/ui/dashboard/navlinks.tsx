import { HomeIcon, WalletIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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
  return (
    <>
      {Links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="bg-neutral-900 h-14 flex items-center rounded-xl p-3 hover:bg-neutral-800 my-1"
          >
            <LinkIcon className="w-6" />
            <p className="pl-2">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
