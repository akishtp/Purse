import "@/app/ui/global.css";
import { work_sans } from "@/app/ui/fonts";

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
        {children}
      </body>
    </html>
  );
}
