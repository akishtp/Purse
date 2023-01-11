import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAccount } from "../../features/user/accountActions";
import { openAddAccount } from "../../features/user/userSlice";
import "./AccountsView.css";
import UpdateAccount from "./UpdateAccount";

const AccountsView = () => {
  const { accounts, userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const [updateAccount, setUpdateAccount] = useState(false);

  const handleSelect = (i) => {
    if (selected === i) {
      setSelected(false);
    } else {
      setSelected(false);
      setSelected(i);
    }
  };

  const handleDelete = async () => {
    let new_accounts = [];
    for (let i = 0; i < accounts.length; i++) {
      if (i !== selected) {
        new_accounts.push(accounts[i]);
        console.log(new_accounts);
      }
    }
    if (window.confirm("Are you sure you wan to delete this account?")) {
      dispatch(
        addAccount({ accounts: new_accounts, token: userDetails.token })
      );
      setSelected(false);
    } else {
      // Do nothing!
    }
  };

  return (
    <div className="accounts-carousel">
      <div className="accounts-view">
        {accounts.map((account, i) => (
          <div
            className={selected === i ? "account-details" : "account-details"}
            key={i}
            style={{ backgroundColor: account.color }}
            onClick={() => {
              handleSelect(i);
            }}
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
      {(selected === 0 || selected) && (
        <div className="adjust-delete-accounts">
          <button
            className="adjust-balance"
            onClick={() => setUpdateAccount(selected)}
          >
            edit balance
          </button>
          <button
            className="delete-account"
            disabled={selected === 0}
            onClick={() => {
              handleDelete();
            }}
          >
            delete
          </button>
        </div>
      )}
      {updateAccount && (
        <UpdateAccount i={selected} setUpdateAccount={setUpdateAccount} />
      )}
    </div>
  );
};

export default AccountsView;
