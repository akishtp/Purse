import { useSelector } from "react-redux";
import "./AccountsView.css";

const AccountsView = () => {
  const { accounts } = useSelector((state) => state.user);

  return (
    <div className="accounts-view">
      {Object.entries(accounts).map(([key, value], i) => (
        <div key={i} className="account-details">
          {key} : {value}
        </div>
      ))}
      <div className="account-details add-accounts">+ Add Accounts</div>
    </div>
  );
};

export default AccountsView;
