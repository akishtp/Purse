import React from "react";
import RecordsView from "../components/RecordsView";
import Accounts from "../components/Accounts";

const Records: React.FC = () => {
  return (
    <div className="h-full flex flex-col pt-6 pb-5">
      <Accounts />
      <RecordsView />
    </div>
  );
};

export default Records;
