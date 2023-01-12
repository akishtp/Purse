import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "../../features/accounts/accountActions";

const UpdateAccount = ({ i, setUpdateAccount }) => {
  const { userDetails } = useSelector((state) => state.user);
  const { accounts } = useSelector((state) => state.accounts);

  const [accName, setAccName] = useState(accounts[i].name);
  const [balance, setbalance] = useState(accounts[i].balance);
  const [color, setColor] = useState(accounts[i].color);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateAccount({
        name: accName,
        balance,
        color,
        _id: accounts[i]._id,
        token: userDetails.token,
      })
    ).then(setUpdateAccount(false));
  };

  return (
    <div className="add-account">
      <div className="add-account-top">
        <div className="add-account-read">Edit Account</div>
        <div
          className="add-account-close"
          onClick={() => setUpdateAccount(false)}
        >
          x
        </div>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
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
          <button type="submit">Edit Account</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccount;
