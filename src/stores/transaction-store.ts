import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from "@/actions/transaction.actions";
import { toast } from "@/components/ui/use-toast";
import {
  AccountSchema,
  AddTransactionSchema,
  TransactionSchema,
  TransactionsSchema,
} from "@/types";
import { z } from "zod";
import { createStore } from "zustand/vanilla";

export type TransactionActions = {
  add: (
    values: z.infer<typeof AddTransactionSchema>,
    updateAccount: (accounts: z.infer<typeof AccountSchema>) => void
  ) => void;
  edit: ({
    values,
    ogAmount,
    ogType,
    updateAccount,
  }: {
    values: z.infer<typeof TransactionSchema>;
    ogAmount: number;
    ogType: string;
    updateAccount: (accounts: z.infer<typeof AccountSchema>) => void;
  }) => void;
  delete: ({
    id,
    accountId,
    type,
    amount,
    updateAccount,
  }: {
    id: number;
    accountId: number;
    type: string;
    amount: number;
    updateAccount: (accounts: z.infer<typeof AccountSchema>) => void;
  }) => void;
};

export type TransactionStore = {
  transactions: z.infer<typeof TransactionsSchema>;
} & TransactionActions;

export const initTransactionsStore = async (): Promise<{
  transactions: z.infer<typeof TransactionsSchema>;
}> => {
  const res = await getTransactions();
  if (res.error) {
    toast({
      variant: "destructive",
      description: res.error,
    });
  } else if (res.success) {
    return { transactions: res.transactions };
  }
  return { transactions: [] };
};

export const defaultInitState: z.infer<typeof TransactionsSchema> = [];

export const createTransactionStore = (
  initState: z.infer<typeof TransactionsSchema> = defaultInitState
) => {
  return createStore<TransactionStore>()((set) => ({
    transactions: initState,
    add: async (
      values: z.infer<typeof AddTransactionSchema>,
      updateAccount: (account: z.infer<typeof AccountSchema>) => void
    ) => {
      const res = await addTransaction(values);
      if (res.error) {
        toast({
          variant: "destructive",
          description: res.error,
        });
      } else if (res.success) {
        set((state) => {
          const newTransactions = [...state.transactions, res.transaction];
          newTransactions.sort(
            (a, b) =>
              new Date(b.dateTime).valueOf() - new Date(a.dateTime).valueOf()
          );
          return {
            transactions: newTransactions,
          };
        });
        updateAccount(res.account);
        toast({
          variant: "default",
          description: res.success,
        });
      }
    },
    edit: async ({
      values,
      ogAmount,
      ogType,
      updateAccount,
    }: {
      values: z.infer<typeof TransactionSchema>;
      ogAmount: number;
      ogType: string;
      updateAccount: (accounts: z.infer<typeof AccountSchema>) => void;
    }) => {
      const res = await editTransaction({ values, ogAmount, ogType });
      if (res.error) {
        toast({
          variant: "destructive",
          description: res.error,
        });
      } else if (res.success) {
        set((state) => ({
          transactions: state.transactions.map((transaction) =>
            transaction.id === values.id ? values : transaction
          ),
        }));
        updateAccount(res.account);
        toast({
          variant: "default",
          description: res.success,
        });
      }
    },
    delete: async ({
      id,
      accountId,
      type,
      amount,
      updateAccount,
    }: {
      id: number;
      accountId: number;
      type: string;
      amount: number;
      updateAccount: (accounts: z.infer<typeof AccountSchema>) => void;
    }) => {
      const res = await deleteTransaction(id, accountId, type, amount);
      if (res.error) {
        toast({
          variant: "destructive",
          description: res.error,
        });
      } else if (res.success) {
        set((state) => ({
          transactions: state.transactions.filter(
            (transaction) => transaction.id !== id
          ),
        }));
        updateAccount(res.account);
        toast({
          variant: "default",
          description: res.success,
        });
      }
    },
  }));
};
