import { validateRequest } from "@/server/lucia";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/auth/login");
  }

  return <div className="min-h-screen">{children};</div>;
}
