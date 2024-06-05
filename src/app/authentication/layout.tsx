import Navbar from "./_components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col gap-4">
      <Navbar />
      <main className="container flex flex-1 items-center justify-center">
        {children}
      </main>
    </div>
  );
}
