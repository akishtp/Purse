import { useSelector } from "react-redux";

const AccountsView = () => {
  const { userDetails, accounts } = useSelector((state) => state.user);

  return (
    <div className="accounts-view">{accounts.toString() + userDetails}</div>
  );
};

export default AccountsView;
