import {
  addAccount,
  deleteAccount,
  editAccount,
  getAccounts,
} from "@/actions/account.actions";
import { toast } from "@/components/ui/use-toast";
import { AccountSchema, AccountsSchema, AddAccountSchema } from "@/types";
import { z } from "zod";
import { createStore } from "zustand/vanilla";

export type AccountActions = {
  add: (values: z.infer<typeof AddAccountSchema>) => void;
  edit: ({
    values,
    ogBalance,
    ogName,
  }: {
    values: z.infer<typeof AccountSchema>;
    ogBalance: number;
    ogName: string;
  }) => void;
  delete: (id: number) => void;
  updateAccount: (values: z.infer<typeof AccountSchema>) => void;
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
    return { accounts: res.accounts };
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
          accounts: [...state.accounts, res.account],
        }));

        toast({
          variant: "default",
          description: res.success,
        });
      }
    },
    edit: async ({
      values,
      ogBalance,
      ogName,
    }: {
      values: z.infer<typeof AccountSchema>;
      ogBalance: number;
      ogName: string;
    }) => {
      const res = await editAccount({ values, ogBalance, ogName });
      if (res.error) {
        toast({
          variant: "destructive",
          description: res.error,
        });
      } else if (res.success) {
        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.id === values.id ? values : account
          ),
        }));
        toast({
          variant: "default",
          description: res.success,
        });
      }
    },
    delete: async (id: number) => {
      const res = await deleteAccount(id);
      if (res.error) {
        toast({
          variant: "destructive",
          description: res.error,
        });
      } else if (res.success) {
        set((state) => ({
          accounts: state.accounts.filter((account) => account.id !== id),
        }));

        toast({
          variant: "default",
          description: res.success,
        });
      }
    },
    updateAccount: (values: z.infer<typeof AccountSchema>) => {
      set((state) => ({
        accounts: state.accounts.map((account) =>
          account.id === values.id ? values : account
        ),
      }));
    },
  }));
};
