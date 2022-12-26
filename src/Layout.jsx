import { openAddRecord } from "./features/records/recordsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AddRecord from "./components/Record/AddRecord";
import { useEffect } from "react";
import { getRecords } from "./features/records/recordsActions";

const Layout = () => {
  const { addRecord } = useSelector((state) => state.records);
  const { userDetails } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails) {
      dispatch(getRecords(userDetails.token));
    }
  }, [userDetails, dispatch, navigate]);
  return (
    <>
      <Navbar />
      <Outlet />
      {addRecord && <AddRecord />}
      {addRecord || (
        <button
          className="add-records-toggle-button"
          onClick={() => dispatch(openAddRecord())}
        >
          +
        </button>
      )}
    </>
  );
};

export default Layout;
