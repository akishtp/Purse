import { logout } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  return (
    <form action={logout} className="flex items-center justify-center h-dvh">
      <Button>Logout</Button>
    </form>
  );
}
