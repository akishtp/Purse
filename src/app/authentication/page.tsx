"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function AuthenticationPage() {
  const router = useRouter();
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Button onClick={() => router.push(`authentication/register`)}>
        Register
      </Button>
    </main>
  );
}
