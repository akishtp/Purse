import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col">
      <div>Hey purse 👛</div>
      <Link href="/auth/login">
        <Button>Login</Button>
      </Link>
    </main>
  );
}
