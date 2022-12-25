import "./temp-css.css";
// import "./Record.css";

const Record = ({ record }) => {
  return (
    <div className="record">
      <div className="left-side">
        <img
          src={require(`../../Assets/icons/${record.category}.png`)}
          alt="category-icon"
          className="category-icon"
        />
        <div className="record-details">
          <span className="record-category-in-text">{record.category}</span>
          <span className="record-account"> {record.account} </span>
          <>
            {record.note && (
              <span className="record-note"> {record.note} </span>
            )}
            {record.payee && (
              <span className="record-payee"> - {record.payee} </span>
            )}
          </>
        </div>
      </div>
      <div className="right-side">
        <span className={`amount ${record.type}`}>
          {record.type === "Expense" ? "-" : "+"}
          {record.amount}
        </span>
      </div>
    </div>
  );
};

export default Record;
