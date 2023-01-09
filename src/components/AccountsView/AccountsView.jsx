import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openAddAccount } from "../../features/user/userSlice";
import "./AccountsView.css";

const AccountsView = () => {
  const { accounts } = useSelector((state) => state.user);
  console.log("accounts" + accounts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("use effect work aavum");
    if (accounts === []) {
      navigate("/auth");
    }
  }, [accounts, navigate]);

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
        className="account-details add-account-button"
        onClick={() => dispatch(openAddAccount())}
      >
        + Add Accounts
      </div>
    </div>
  );
};

export default AccountsView;
