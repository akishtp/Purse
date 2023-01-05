import { useDispatch, useSelector } from "react-redux";
import { addAccount } from "../../features/user/accountActions";
import "./AccountsView.css";

const AccountsView = () => {
  const { accounts } = useSelector((state) => state.user);
  const { userDetails } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const addAccountHandler = () => {
    let newAcc = { cashuandi: 120.22, fedrorrogerrer: 123.22 };
    dispatch(addAccount({ accounts: newAcc, token: userDetails.token }));
  };

  return (
    <div className="accounts-view">
      {Object.entries(accounts).map(([key, value], i) => (
        <div key={i} className="account-details">
          {key} : {value}
        </div>
      ))}
      <div
        className="account-details add-accounts"
        onClick={() => addAccountHandler()}
      >
        + Add Accounts
      </div>
    </div>
  );
};

export default AccountsView;
