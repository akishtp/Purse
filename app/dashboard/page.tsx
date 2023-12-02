import { playfair_display } from "../ui/fonts";

export default function Page() {
  return (
    <main className="bg-neutral-900 min-h-full rounded-xl">
      <h1 className={`${playfair_display.className}`}>Dashboard</h1>
    </main>
  );
}
