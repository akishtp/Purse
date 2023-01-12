import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAccount } from "../../features/accounts/accountActions";
import { closeAddAccount } from "../../features/accounts/accountSlice";

function AddAccount() {
  const [accName, setAccName] = useState("");
  const [balance, setbalance] = useState(0);
  const [color, setColor] = useState("Default");
  const { userDetails } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleAddAccount = (e) => {
    e.preventDefault();
    dispatch(
      addAccount({ name: accName, balance, color, token: userDetails.token })
    );
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
                value={balance}
                onChange={(e) => setbalance(e.target.value)}
                onClick={() => setbalance("")}
                min="0"
                max="999999999999"
              />
            </label>
          </div>
          <label className="color-selector-label">
            Color:
            <select
              className="color-selector"
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
