import { useAppSelector } from "../app/hooks";

const RecordsView = () => {
  const { records } = useAppSelector((state) => state.records);

  return (
    <div className="h-fit rounded-2xl overflow-hidden">
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
        {records?.map((record) => {
          return (
            <div
              className="bg-neutral-950 h-16 border-b px-4 flex items-center border-neutral-800"
              key={record.ID}
            >
              {record.note}
            </div>
          );
        })}
        <div className="h-14"></div>
      </div>
    </div>
  );
};

export default RecordsView;
