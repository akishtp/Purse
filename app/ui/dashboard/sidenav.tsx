import Link from "next/link";
import { playfair_display } from "@/app/ui/fonts";
import NavLinks from "./navlinks";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

export default function SideNav() {
  return (
    <div className="h-full flex flex-col overflow-hidden rounded-xl">
      <Link href="/">
        <div
          className={`${playfair_display.className} h-40 bg-violet-700 rounded-2xl text-3xl p-4 flex items-end hover:bg-violet-800`}
        >
          Purse
        </div>
      </Link>
      <div className="flex flex-col justify-between grow">
        <div className="my-1 flex flex-col">
          <NavLinks />
        </div>
        <button
          className="bg-neutral-800 h-14 rounded-xl bg-neutral-900 flex items-center p-4 hover:bg-neutral-800 hover:cursor-pointer"
          onClick={() => signOut()}
        >
          <PowerIcon className="w-6" />
          <p className="pl-2">Logout</p>
        </button>
      </div>
    </div>
  );
}
