import { openAddRecord } from "./features/records/recordsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Add from "./components/Record/Add";

const Layout = () => {
  const { addRecord } = useSelector((state) => state.records);
  const dispatch = useDispatch();
  return (
    <>
      <Navbar />
      <Outlet />
      {addRecord && <Add />}
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
