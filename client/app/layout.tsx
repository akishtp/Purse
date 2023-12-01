import '@/app/ui/global.css';
import { playfair_display } from '@/app/ui/fonts';

export default function RootLayout({
  children,
} : {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair_display.className} antialiased`}>{children}</body>
    </html>
  );
}
