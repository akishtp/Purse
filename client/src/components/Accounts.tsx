import { FC } from "react";
import { useAppSelector } from "../app/hooks";
// import AddAccount from "./AddAccount";
import { Drawer } from "vaul";

const Accounts: FC = () => {
  const { accounts } = useAppSelector((state) => state.accounts);
  // const [addAccountModal, setAddAccountModal] = useState<boolean>(false);

  return (
    <div className="grid gap-4 grid-cols-2 pb-5 md:grid-cols-4">
      {accounts?.map((account) => {
        return (
          <div
            className="flex justify-between h-10 rounded-lg items-center px-2"
            style={{ backgroundColor: account.color }}
            key={account.ID}
          >
            <div>{account.account_name}</div>
            <div>{account.balance}</div>
          </div>
        );
      })}
      {/* <button
        className="flex justify-between bg-transparent border-2 h-10 rounded-lg items-center px-2 select-none"
        onClick={() => setAddAccountModal(true)}
        >
        <div>Add Account</div>
        <div>+</div>
        </button>
        {addAccountModal && (
          <AddAccount setAddAccountModal={setAddAccountModal} />
        )} */}
      <Drawer.Trigger className="flex justify-between bg-transparent border-2 h-10 rounded-lg items-center px-2 select-none">
        <div>Add Account</div>
        <div>+</div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Content className="fixed bottom-0 z-50 flex justify-center w-screen border-t border-neutral-800">
          <div className="h-1.5 w-44 bg-neutral-700 rounded mt-2"></div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-1">
            <label className="flex items-center justify-between py-2">
              Balance:
              <input
                autoFocus
                {...register("balance", { required: true })}
                className="h-12 px-4 w-2/3 rounded-lg bg-neutral-900 focus:outline-none border-2 border-neutral-800 text-right hover:border-neutral-700 focus:border-neutral-700"
              />
            </label>
            <label className="flex items-center justify-between py-2">
              Account Name:
              <input
                {...register("account_name", { required: true })}
                className="h-12 px-4 w-2/3 rounded-lg bg-neutral-900 focus:outline-none border-2 border-neutral-800 text-right hover:border-neutral-700 focus:border-neutral-700"
              />
            </label>
            <label className="flex items-center justify-between py-2">
              <div>Color:</div>
              <div className="flex items-center justify-between w-2/3">
                <select
                  {...register("color")}
                  className="h-12 px-4 rounded-lg bg-neutral-900 focus:outline-none border-2 border-neutral-800 text-right hover:border-neutral-700 focus:border-neutral-700 w-select-color"
                  onClick={() => {
                    setSelectedColor(getValues("color"));
                  }}
                >
                  {colors.map((color) => {
                    return (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    );
                  })}
                </select>
                {/* <ColorBox color={selectedColor} /> */}
                <div
                  className="h-12 w-12 rounded-2xl border-neutral-800 border-2"
                  style={{ backgroundColor: selectedColor }}
                ></div>
              </div>
            </label>
            <button className="bg-neutral-100 text-neutral-900 w-full h-12 rounded-lg hover:bg-neutral-300 my-2">
              {loading ? <PulseLoader color="#fff" size={5} /> : "Add Account"}
            </button>
          </form>
        </Drawer.Content>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/80" />
      </Drawer.Portal>
    </div>
  );
};

export default Accounts;
