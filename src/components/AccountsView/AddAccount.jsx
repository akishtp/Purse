import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAccount } from "../../features/user/accountActions";
import { closeAddAccount } from "../../features/user/userSlice";

function AddAccount() {
  const [accName, setAccName] = useState("");
  const [accValue, setAccValue] = useState(0);
  const [color, setColor] = useState("Default");
  const { userDetails, accounts } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAddAccount = (e) => {
    e.preventDefault();
    let new_accounts = [...accounts, { name: accName, money: accValue, color }];
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
      <form onSubmit={(e) => handleAddAccount(e)}>
        <div className="get-details" style={{ backgroundColor: color }}>
          <div className="name-value">
            <label>
              Account Name
              <input
                type="text"
                value={accName}
                onChange={(e) => setAccName(e.target.value)}
                required
              />
            </label>
            <label>
              Initial Value
              <input
                type="number"
                value={accValue}
                onChange={(e) => setAccValue(e.target.value)}
                onClick={() => setAccValue("")}
              />
            </label>
          </div>
          <label>
            Color:
            <select
              className="category-input"
              onChange={(e) => setColor(e.target.value)}
              value={color}
            >
              <option value="#8664ff">Default</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
              <option value="Yellow">Yellow</option>
              <option value="Orange">Orange</option>
            </select>
          </label>
        </div>
        <div className="submit-details">
          <button type="submit">Add Account</button>
        </div>
      </form>
    </div>
  );
}

export default AddAccount;
