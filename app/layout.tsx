"use client";

import "@/app/ui/global.css";
import { work_sans } from "@/app/ui/fonts";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${work_sans.className} antialiased bg-neutral-950 text-neutral-200`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
