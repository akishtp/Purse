import { addAccount, getAccounts } from "@/actions/account.actions";
import { toast } from "@/components/ui/use-toast";
import { AccountsSchema, AddAccountSchema } from "@/types";
import { z } from "zod";
import { createStore } from "zustand/vanilla";

export type Account = {
  id: number;
  userId: string;
  name: string;
  balance: number;
  color: string;
};

export type AccountActions = {
  add: (values: z.infer<typeof AddAccountSchema>) => void;
};

export type AccountStore = {
  accounts: z.infer<typeof AccountsSchema>;
} & AccountActions;

export const initAccountsStore = async (): Promise<{
  accounts: z.infer<typeof AccountsSchema>;
}> => {
  const res = await getAccounts();
  if (res.error) {
    toast({
      variant: "destructive",
      description: res.error,
    });
  } else if (res.success) {
    return { accounts: res.data };
  }
  return { accounts: [] };
};

export const defaultInitState: z.infer<typeof AccountsSchema> = [];

export const createAccountStore = (
  initState: z.infer<typeof AccountsSchema> = defaultInitState
) => {
  return createStore<AccountStore>((set) => ({
    accounts: initState,
    add: async (values: z.infer<typeof AddAccountSchema>) => {
      const res = await addAccount(values);
      if (res.error) {
        toast({
          variant: "destructive",
          description: res.error,
        });
      } else if (res.success) {
        set((state) => ({
          accounts: [...state.accounts, ...res.data],
        }));

        toast({
          variant: "default",
          description: res.success,
        });
      }
    },
  }));
};
