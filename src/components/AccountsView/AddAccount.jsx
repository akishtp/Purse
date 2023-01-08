import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAccount } from "../../features/user/accountActions";
import { closeAddAccount } from "../../features/user/userSlice";

function AddAccount() {
  const [accName, setAccName] = useState("");
  const [accValue, setAccValue] = useState(0);
  const { userDetails, accounts } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAddAccount = (e) => {
    e.preventDefault();
    let new_accounts = [...accounts, { name: accName, money: accValue }];
    console.log(new_accounts);
    dispatch(addAccount({ accounts: new_accounts, token: userDetails.token }));
  };

  return (
    <div className="add-account">
      <div className="add-account-top">
        <div className="add-account-read">Add Account</div>
        <div
          className="add-account-close"
          onClick={() => dispatch(closeAddAccount())}
        >
          x
        </div>
      </div>
      <form className="get-details" onSubmit={(e) => handleAddAccount(e)}>
        <label>
          Account Name
          <input
            type="text"
            value={accName}
            onChange={(e) => setAccName(e.target.value)}
          />
        </label>
        <label>
          Initial Value
          <input
            type="number"
            value={accValue}
            onChange={(e) => setAccValue(e.target.value)}
          />
        </label>
        <div className="submit-details">
          <button type="submit" className="submit">
            Add Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAccount;
