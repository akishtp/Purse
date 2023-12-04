"use client";

import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <main className="flex justify-center items-center h-screen">
      {/* <Link href="api/auth/signin"> */}
      <button
        className="hover:bg-violet-800 text-gray-100 font-semibold py-2 px-4 border border-violet-950 rounded shadow bg-violet-700"
        onClick={(e) => {
          e.preventDefault();
          signIn("github", {
            callbackUrl: "/Dashboard/DefaultDash",
          });
        }}
      >
        🐙 Sign in with GitHub
      </button>
      {/* </Link> */}
    </main>
  );
}
