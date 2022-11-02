import { openAddRecord } from "./features/records/recordsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AddRecord from "./components/Record/AddRecord";

const Layout = () => {
  const { addRecord } = useSelector((state) => state.records);
  const dispatch = useDispatch();
  return (
    <>
      <Navbar />
      <Outlet />
      {addRecord && <AddRecord />}
      <button
        className="add-records-toggle-button"
        onClick={() => dispatch(openAddRecord())}
      >
        +
      </button>
    </>
  );
};

export default Layout;
