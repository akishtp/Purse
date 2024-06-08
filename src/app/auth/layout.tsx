import Navbar from "./_components/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex gap-4 flex-col">
      <Navbar />
      <div className="flex items-center justify-center container flex-1">
        {children}
      </div>
    </div>
  );
}
