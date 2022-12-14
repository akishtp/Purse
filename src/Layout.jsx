import { openAddRecord } from "./features/records/recordsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AddRecord from "./components/Record/AddRecord";
import { useEffect } from "react";
import { getRecords } from "./features/records/recordsActions";
import { getAccounts } from "./features/accounts/accountActions";

const Layout = () => {
  const { addRecord } = useSelector((state) => state.records);
  const { userDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getRecords(userDetails.token));
      dispatch(getAccounts(userDetails.token));
    } catch {
      navigate("/auth");
    }
  }, [navigate, userDetails, dispatch]);

  return userDetails ? (
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
  ) : (
    <Navigate to="/login" replace />
  );
};

export default Layout;
