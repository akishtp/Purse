import { openAddRecord } from "./features/records/recordsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AddRecord from "./components/Record/AddRecord";
import { useEffect } from "react";
import { getRecords } from "./features/records/recordsActions";

const Layout = () => {
  const {
    addRecord,
    // records
  } = useSelector((state) => state.records);
  const navigate = useNavigate();

  const { userDetails } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getRecords(userDetails.token));
    } catch {
      navigate("/auth");
    }
  }, [dispatch, navigate, userDetails]);
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
