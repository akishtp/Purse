import { useDispatch, useSelector } from "react-redux";
import { openAddAccount } from "../../features/user/userSlice";
import "./AccountsView.css";

const AccountsView = () => {
  const { accounts } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="accounts-view">
      {accounts.map((account, i) => (
        <div
          className="account-details"
          key={i}
          style={{ backgroundColor: account.color }}
        >
          {account.name} : {account.money}
        </div>
      ))}
      <div
        className="account-details add-accounts"
        onClick={() => dispatch(openAddAccount())}
      >
        + Add Accounts
      </div>
    </div>
  );
};

export default AccountsView;
