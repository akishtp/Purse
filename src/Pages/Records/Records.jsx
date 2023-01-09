import { useSelector } from "react-redux";
import Record from "../../components/Record/Record";
import "./Records.css";

const Records = () => {
  const { records, loading, recordError } = useSelector(
    (state) => state.records
  );

  if (recordError) {
    return <>{recordError}</>;
  } else if (loading) {
    <>loading</>;
  } else {
    return (
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
    );
  }
};

export default Records;
