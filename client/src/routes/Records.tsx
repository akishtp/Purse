import React from "react";
import RecordsView from "../components/RecordsView";
import Accounts from "../components/Accounts";
import Graph from "../components/Graph";

const Records: React.FC = () => {
  return (
    <>
      <Accounts />
      <RecordsView />
      <Graph />
    </>
  );
};

export default Records;
