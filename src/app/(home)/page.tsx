import { AddAccount } from "./_components/addAccount";

export default function HomePage() {
  return (
    <div className="flex flex-1 py-2 px-1">
      <div className="rounded-2xl w-full p-4 bg-neutral-200 dark:bg-neutral-900">
        <div className="grid gap-2 grid-cols-2 pb-5 md:grid-cols-4">
          <div className="flex justify-between h-10 rounded-lg items-center px-2 bg-blue-500">
            <div>CASH</div>
            <div>100</div>
          </div>
          <div className="flex justify-between h-10 rounded-lg items-center px-2 bg-purple-500">
            <div>SBI</div>
            <div>100</div>
          </div>
          <AddAccount />
        </div>
      </div>
    </div>
  );
}
