import { useAppSelector } from "../app/hooks";
import { categories } from "../data/categories";

const RecordsView = () => {
  const { records } = useAppSelector((state) => state.records);

  return (
    <>
      {records!.length > 0 ? (
        <>
          <div className="bg-neutral-800 flex items-center px-4 justify-between rounded-t-2xl py-3">
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
          <div className="h-fit rounded-b-2xl overflow-hidden">
            <div className="overflow-scroll h-full">
              {records!.map((record) => {
                let CategoryIcon = categories.find(
                  (category) => category.name === record.category
                )!.icon;
                return (
                  <div
                    className="bg-neutral-950 h-16 border-b px-4 flex items-center border-neutral-800 justify-between last:border-b-0"
                    key={record.ID}
                  >
                    <div className="flex items-center w-4/5">
                      <CategoryIcon className="text-3xl" />
                      <div className="px-8 w-full flex items-center justify-between">
                        <div>{record.note}</div>
                        <div>{record.account_name}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end w-1/5">
                      <div
                        className={`flex ${
                          record.type === "Expense"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        <div>{record.type === "Expense" ? "-" : "+"}</div>
                        <div>{record.amount}</div>
                      </div>
                      <div className="text-neutral-500 text-sm">
                        {record.date_time.slice(8, 10)}-
                        {record.date_time.slice(5, 7)}-
                        {record.date_time.slice(0, 4)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">No Records</div>
      )}
    </>
  );
};

export default RecordsView;
