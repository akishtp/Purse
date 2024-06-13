import { addAccount, getAccounts } from "@/actions/accounts.actions";
import { createStore } from "zustand/vanilla";
import { AccountsSchema, AddAccountSchema } from "@/types/index";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";

export type AccountActions = {
  add: (values: z.infer<typeof AddAccountSchema>) => void;
  get: () => void;
};

export type AccountStore = z.infer<typeof AccountsSchema> & AccountActions;

export const defaultInitState: z.infer<typeof AccountsSchema> = {
  accounts: [],
};

export const createAccountStore = (
  initState: z.infer<typeof AccountsSchema> = defaultInitState
) => {
  return createStore<AccountStore>()((set) => ({
    ...initState,
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
    get: async () => {
      const res = await getAccounts();
      if (res.error) {
        toast({
          variant: "destructive",
          description: res.error,
        });
      } else if (res.success) {
        set(() => ({
          accounts: res.data,
        }));
        toast({
          variant: "default",
          description: res.success,
        });
      }
    },
  }));
};
