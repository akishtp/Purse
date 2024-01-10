import React from "react";
import RecordsView from "../components/RecordsView";
import Accounts from "../components/Accounts";
import { Drawer } from "vaul";

const Records: React.FC = () => {
  return (
    <div className="h-full flex flex-col pt-6 pb-5">
      <Drawer.Root shouldScaleBackground>
        <Accounts />
        <RecordsView />
      </Drawer.Root>
    </div>
  );
};

export default Records;
