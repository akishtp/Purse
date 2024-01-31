import { Outlet, useNavigate } from "react-router-dom";
import AddRecord from "./components/AddRecord";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Drawer } from "vaul";
import { getAccounts } from "./features/accounts/accountsAction";
import { getRecords } from "./features/records/recordsAction";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { userDetails } = useAppSelector((state) => state.user);
  const { accounts } = useAppSelector((state) => state.accounts);
  const { records } = useAppSelector((state) => state.records);

  useEffect(() => {
    if (!userDetails) {
      navigate("/login");
    }
    if (accounts.length === 0 || records.length === 0) {
      dispatch(getAccounts(userDetails!.jwt));
      dispatch(getRecords(userDetails!.jwt));
    }
  }, [userDetails]);

  return (
    <div className="flex">
      <Navbar />
      <div className="w-8/12 bg-neutral-900 my-2 mx-1 rounded-xl px-4 h-content md:w-6/12">
        <Outlet />
      </div>
      <Drawer.Root>
        <AddRecord />
        <Drawer.Trigger className="absolute bg-purple-700 rounded-full px-6 right-2 bottom-3 py-3 md:hidden">
          + Add Record
        </Drawer.Trigger>
      </Drawer.Root>
    </div>
  );
}

export default App;
