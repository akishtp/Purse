import "./Record.css";

const Record = ({ record }) => {
  return (
    <div className="record">
      <div className="left-side">
        <img
          src={require(`../../Assets/${record.category}.png`)}
          alt="record-category"
        />
        <div className="record-details">
          <p className="category">{record.category}</p>
          <p className="account">{record.account}</p>
          <div className="extras">
            {record.note && <p className="payee">{record.note}</p>}
            {record.note && record.payee && <>&nbsp;-&nbsp;</>}
            {record.payee && <p className="note">{record.payee}</p>}
          </div>
        </div>
      </div>
      <div className={`right-side ${record.type}`}>
        {record.type === "Expense" ? "-" : "+"}
        {record.amount}
      </div>
    </div>
  );
};

export default Record;
