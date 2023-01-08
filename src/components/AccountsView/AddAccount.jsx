import { useDispatch } from "react-redux";
import { closeAddAccount } from "../../features/user/userSlice";

function AddAccount() {
  const dispatch = useDispatch();
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
      <form className="get-details">
        <label>
          Account Name
          <input type="text" />
        </label>
        <label>
          Initial Value
          <input type="number" />
        </label>
      </form>
      <div className="submit-details">
        <button className="submit">Add Account</button>
      </div>
    </div>
  );
}

export default AddAccount;
