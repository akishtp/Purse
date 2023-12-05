"use client";

import { signIn, useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();

  let button = null;

  if (status === "loading") {
    button = <button>loading</button>;
  }
  if (!session) {
    button = (
      <button
        className="hover:bg-violet-800 text-gray-100 font-semibold py-2 px-4 border border-violet-950 rounded shadow bg-violet-700"
        onClick={() => {
          // e.preventDefault();
          signIn("github", {
            callbackUrl: "/dashboard",
          });
        }}
      >
        🐙 Sign in with GitHub
      </button>
    );
  }
  if (status === "authenticated") {
    return <p>Signed in as {session.user!.email}</p>;
  }

  return (
    <main className="flex justify-center items-center h-screen">{button}</main>
  );
}
