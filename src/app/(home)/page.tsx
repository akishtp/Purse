import Image from "next/image";
import { AddAccount } from "./_components/addAccount";

export default function HomePage() {
  return (
    <div className="flex flex-col h-full">
      <div className="grid gap-2 grid-cols-2 pb-3 md:grid-cols-4">
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
      <div className="bg-neutral-100 rounded-t-2xl h-10 flex items-center px-2 dark:bg-neutral-800">
        Transactions
      </div>
      <div className="flex-1 bg-red-500 overflow-scroll border-l-2 border-r-2 border-b-2 border-neutral-100 dark:border-neutral-800 rounded-b-2xl">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => {
          return (
            <div
              key={i}
              className="bg-neutral-200 h-14 flex items-center justify-between px-4 border-b-2 border-neutral-50 dark:border-neutral-900 dark:bg-neutral-950 last:border-b-0"
            >
              <div className="w-1/4 flex items-center gap-2">
                <Image
                  src="/icons/light.svg"
                  width={24}
                  height={24}
                  alt="light"
                />
                <div className="text-sm">CASH</div>
              </div>
              <div className="text-start flex-1 flex justify-between items-center">
                <div className="text-sm">note</div>
                <div className="text-xs">11/11/11</div>
              </div>
              <div className="w-1/6 text-end">
                <div className="text-red-500 text-sm">1000</div>
                <div className="text-xs">Balance</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

{
  /* <div className="bg-neutral-200 h-14 flex items-center justify-between px-2 border-b-2 border-neutral-50 dark:border-neutral-900 dark:bg-neutral-950">
  <div className="w-1/4 flex items-center gap-2">
    <Image src="/icons/light.svg" width={24} height={24} alt="light" />
    <div className="text-sm">CASH</div>
  </div>
  <div className="text-start flex-1 flex justify-between items-center">
    <div className="text-sm">note</div>
    <div className="text-xs">11/11/11</div>
  </div>
  <div className="w-1/6 text-end">
    <div className="text-red-500 text-sm">1000</div>
    <div className="text-xs">Balance</div>
  </div>
</div> */
}
