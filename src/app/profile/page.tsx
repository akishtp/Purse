import { logout } from "@/actions/auth.actions";
import { validateRequest } from "@/server/lucia";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth/login");
  }
  return (
    <form action={logout} className="flex items-center justify-center h-full">
      <button>Logout</button>
    </form>
  );
}
