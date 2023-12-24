import { LuFuel } from "react-icons/lu";

const RecordsView = () => {
  return (
    <div className="h-1/2 rounded-2xl overflow-hidden">
      <div className="bg-neutral-800 h-14 flex items-center px-4 justify-between">
        <div className="text-lg font-bold">Records</div>
        <select className="bg-transparent">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 60 days</option>
          <option>Last 90 days</option>
        </select>
      </div>
      <div className="overflow-scroll h-full">
        <div className="bg-neutral-950 h-16 border-b px-4 flex items-center border-neutral-800">
          <div>
            <LuFuel className="text-2xl" />
          </div>
        </div>
        <div className="bg-neutral-950 h-16 border-b px-4 flex items-center border-neutral-800">
          A record 11
        </div>
        <div className="bg-neutral-950 h-16 border-b px-4 flex items-center border-neutral-800">
          A record 10
        </div>
        <div className="bg-neutral-950 h-16 border-b px-4 flex items-center border-neutral-800">
          A record 9
        </div>
        <div className="bg-neutral-950 h-16 border-b px-4 flex items-center border-neutral-800">
          A record 8
        </div>
        <div className="bg-neutral-950 h-16 border-b px-4 flex items-center border-neutral-800">
          A record 7
        </div>
        <div className="bg-neutral-950 h-16 border-b px-4 flex items-center border-neutral-800">
          A record 6
        </div>
        <div className="bg-neutral-950 h-16 border-b px-4 flex items-center border-neutral-800">
          A record 5
        </div>
        <div className="bg-neutral-950 h-16 border-b px-4 flex items-center border-neutral-800">
          A record 4
        </div>
        <div className="bg-neutral-950 h-16 border-b px-4 flex items-center border-neutral-800">
          A record 3
        </div>
        <div className="bg-neutral-950 h-16 border-b px-4 flex items-center border-neutral-800">
          A record 2
        </div>
        <div className="bg-neutral-950 h-16 px-4 flex items-center border-neutral-800">
          A record 1
        </div>
        <div className="h-14"></div>
      </div>
    </div>
  );
};

export default RecordsView;
