export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-2">
        <div className="border-2 h-24 rounded-2xl flex py-3 px-2 flex-col justify-between">
          <div>Total balance:</div>
          <div className="text-2xl text-end text-green-500">₹200</div>
        </div>
        <div className="border-2 h-24 rounded-2xl flex py-3 px-2 flex-col justify-between">
          <div>This month:</div>
          <div className="text-2xl text-end text-red-500">₹200</div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
          <div className="border-2 rounded-lg">Balance line graph</div>
          <div className="border-2 rounded-lg">Spending by category</div>
        </div>
      </div>
    </>
  );
}
