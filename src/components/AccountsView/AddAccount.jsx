import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeAddAccount } from "../../features/user/userSlice";

function AddAccount() {
  const [accName, setAccName] = useState("");
  const [accValue, setAccValue] = useState(0);
  const dispatch = useDispatch();

  const handleAddAccount = (e) => {
    e.preventDefault();
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
      </form>
      <div className="submit-details">
        <button className="submit">Add Account</button>
      </div>
    </div>
  );
}

export default AddAccount;
