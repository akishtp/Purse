import React from "react";

const Accounts: React.FC = () => {
  return (
    <div className="grid gap-4 grid-cols-3 pb-5">
      <div className="flex justify-between bg-blue-500 h-10 rounded-lg items-center px-2">
        <div>CASH</div>
        <div>100</div>
      </div>
      <div className="flex justify-between bg-red-500 h-10 rounded-lg items-center px-2">
        <div>SBI</div>
        <div>1.57</div>
      </div>
      <div className="flex justify-between bg-transparent border-2 h-10 rounded-lg items-center px-2">
        <div>Add Account</div>
        <div>+</div>
      </div>
    </div>
  );
};

export default Accounts;
