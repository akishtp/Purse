import UpdateAccount from "./UpdateAccount";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccounts } from "../../features/accounts/accountActions";
import { openAddAccount } from "../../features/accounts/accountSlice";
import "./AccountsView.css";

const AccountsView = () => {
  const { userDetails } = useSelector((state) => state.user);
  const { accounts, loading } = useSelector((state) => state.accounts);

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
    const token = userDetails.token;
    dispatch(deleteAccounts({ _id: accounts[selected]._id, token }));
  };

  return (
    <div className="accounts-carousel">
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          <div className="accounts-view">
            {accounts.map((account, i) => (
              <div
                className={
                  selected === i ? "account-details" : "account-details"
                }
                key={i}
                style={{ backgroundColor: account.color }}
                onClick={() => {
                  handleSelect(i);
                }}
              >
                {account.name} : {account.balance}
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
                edit account
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
        </>
      )}
      {(updateAccount === 0 || updateAccount) && (
        <UpdateAccount i={selected} setUpdateAccount={setUpdateAccount} />
      )}
    </div>
  );
};

export default AccountsView;
