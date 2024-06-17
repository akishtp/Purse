import { addTransaction, getTransactions } from "@/actions/transaction.actions";
import { toast } from "@/components/ui/use-toast";
import { AddTransactionSchema, TransactionsSchema } from "@/types";
import { z } from "zod";
import { createStore } from "zustand/vanilla";

export type TransactionActions = {
  add: (values: z.infer<typeof AddTransactionSchema>) => void;
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
    return { transactions: res.data };
  }
  return { transactions: [] };
};

export const defaultInitState: z.infer<typeof TransactionsSchema> = [];

export const createTransactionStore = (
  initState: z.infer<typeof TransactionsSchema> = defaultInitState
) => {
  return createStore<TransactionStore>()((set) => ({
    transactions: initState,
    add: async (values: z.infer<typeof AddTransactionSchema>) => {
      const res = await addTransaction(values);
      if (res.error) {
        toast({
          variant: "destructive",
          description: res.error,
        });
      } else if (res.success) {
        set((state) => ({
          transactions: [...state.transactions, ...res.data],
        }));
        toast({
          variant: "default",
          description: res.success,
        });
      }
    },
  }));
};
