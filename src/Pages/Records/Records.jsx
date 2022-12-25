import { useSelector } from "react-redux";
import Record from "../../components/Record/Record";
import "./Records.css";

const Records = () => {
  const { records } = useSelector((state) => state.records);

  return (
    <div className="records">
      {records.length > 0 ? (
        <div className="records-wrapper">
          {records.map((record) => (
            <Record key={record._id} record={record} />
          ))}
        </div>
      ) : (
        <div>No Records</div>
      )}
    </div>
  );
};

export default Records;
