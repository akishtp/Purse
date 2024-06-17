import Navbar from "./_components/navbar";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex gap-4 flex-col">
      <Navbar />
      <div className="flex items-center justify-center container flex-1">
        {children}
      </div>
    </div>
  );
}
