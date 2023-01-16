import { useSelector } from "react-redux";
import AccountsView from "../../components/AccountsView/AccountsView";
import AddAccount from "../../components/AccountsView/AddAccount";
import Records from "../Records/Records";

const Home = () => {
  const { addAccount } = useSelector((state) => state.accounts);
  return (
    <div className="home">
      <AccountsView />
      {addAccount && <AddAccount />}
      <Records />
    </div>
  );
};

export default Home;
