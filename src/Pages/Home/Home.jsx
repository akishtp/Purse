import { useSelector } from "react-redux";
import AccountsView from "../../components/AccountsView/AccountsView";
import AddAccount from "../../components/AccountsView/AddAccount";

const Home = () => {
  const { addAccount } = useSelector((state) => state.accounts);
  return (
    <div className="home">
      <AccountsView />
      {addAccount && <AddAccount />}
    </div>
  );
};

export default Home;
