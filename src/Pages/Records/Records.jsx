import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Record from "../../components/Record/Record";
import { getRecords } from "../../features/records/recordsActions";
import "./Records.css";

const Records = () => {
  const { records, getError } = useSelector((state) => state.records);
  const { userDetails } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (userDetails) {
      dispatch(getRecords(userDetails.token));
    }
  }, [dispatch, records, userDetails]);
  return (
    <div className="records">
      {records.length > 0 ? (
        <div className="record-wrapper">
          {records.map((record) => (
            <Record key={record._id} record={record} />
          ))}
        </div>
      ) : (
        <div>no records to show {getError}</div>
      )}
    </div>
  );
};

export default Records;
