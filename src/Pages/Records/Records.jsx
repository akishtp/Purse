import { useSelector } from "react-redux";
import Record from "../../components/Record/Record";
import "./Records.css";

const Records = () => {
  const { records, loading } = useSelector((state) => state.records);
  return (
    <>
      {loading ? (
        <div className="loading">loading</div>
      ) : (
        <div className="records">
          {records.length > 0 ? (
            <>
              {records.map((record) => (
                <Record key={record._id} record={record} />
              ))}
            </>
          ) : (
            <div className="no-records">No Records! Try adding new Records</div>
          )}
        </div>
      )}
    </>
  );
};

export default Records;
